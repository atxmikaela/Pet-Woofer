import { NextFunction, Request, Response } from "express";
import { CustomeRequest } from "../../typings/express";
import { validateQueryParams } from "../../utils/validation";
import db from '../../db/models';
import { Op } from 'sequelize';
import { dateConverter } from "../../utils/date-conversion";
import { GoodPet } from "../../typings/data";
import { ForbiddenError, NoResourceError, UnauthorizedError } from "../../errors/customErrors";
import {setTokenCookie} from "../../utils/auth";
const { singleFileUpload, singleMulterUpload } = require("../../awsS3");
const { multiplePublicFileUpload, multipleMulterUpload } = require('../../awsS3');


const { Pet, Shelter, User } = db;
const router = require('express').Router();


// Get all petable pets

router.get('/', validateQueryParams, async (req: Request, res: Response, next: NextFunction) => {
    try
    {
        const pets = await Pet.findAll({
            include: [
                {
                    model: Shelter,
                    as: 'shelter'
                },
                {
                    model: db.PetImage,
                    as: 'images'
                }
            ]
        });

        const petTransform = (pet: any) =>
        {
            const petJson = pet.toJSON();
            // const { ...res } = petJson;
            return {
                ...petJson,
                expireDate: petJson.expireDate,
                createdAt: dateConverter(petJson.createdAt),
                updatedAt: dateConverter(petJson.updatedAt)
                // return res;
            };
        };

        const byId = pets.reduce((acc: any, pet: any) =>
        {
            const transformed = petTransform(pet);
            acc[transformed.id] = transformed;
            return acc;
        }, {});
        // const allPets: any[] = [];

        // petTransform.forEach((pet: any) => {
        //     byId[pet.id] = pet;
        //     allPets.push(pet);
        // });


        res.status(200).json({ byId });

    } catch (e) {
        return next(e);
    }
});

// Get one petable pet by petable pet ID:

router.get('/:id', validateQueryParams, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const petId = req.params.id;
        const pet = await Pet.findByPk(petId, {
            include: [
                {
                    model: Shelter,
                    as: 'shelter'
                },
                {
                    model: db.PetImage,
                    as: 'images'
                }
            ]
        });

        if (!pet) throw new NoResourceError("Petable pet couldn't be found", 404);
        res.status(200);
        res.json(pet);
    } catch (e)
    {
        return next(e);
    }
});

// Get all petable pets owned by current user: 

router.get('/my-pets/:userId', async (req: CustomeRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;
        const pets = await Pet.findAll({
            where: {
                userId: userId
            },
            include: [
                {model: User, as: "Owner"}
            ]
        });

        const petTransform = pets.map((pet: any) => {
            const petJson = pet.toJSON();
            const { Owner, ...res } = petJson;

            res.ownerId = Owner.id;
            res.createdAt = dateConverter(res.createdAt);
            res.updatedAt = dateConverter(res.updatedAt);
            return res;
        });

        res.status(200);
        res.json({ Pets: petTransform });
    } catch (e) {
        res.json({message: e});
    }
});

// get an petable pet by shelter
router.get('/by-shelter/:shelterId', async (req: CustomeRequest, res: Response, next: NextFunction) =>
{
    try
    {
        const shelterId = req.params.shelterId;
        const pets = await Pet.findAll({
            where: {
                shelterId: shelterId
            },
            include: [
                {model: Shelter, as: "Rescue"}
            ]
        });

        const petTransform = pets.map((pet: any) =>
        {
            const petJson = pet.toJSON();
            const { Rescue, ...res } = petJson;

            res.rescueId = Rescue.id;
            res.createdAt = dateConverter(res.createdAt);
            res.updatedAt = dateConverter(res.updatedAt);
            return res;
        });

        res.status(200);
        res.json({ Pets: petTransform });
    } catch (e)
    {
        res.json({message: e});
    }
});


router.post('/', async (req: CustomeRequest, res: Response, next: NextFunction) => {
    try
    {
        if (!req.body) throw new Error("An error occured processing your request. Please try again");
        if (!req.body.userId) throw new Error("You must be signed in to add a rescued pet.");
        if (!req.body.shelterId) throw new Error("You must include the shelter to add a rescued pet.");
        if (!req.body.name) throw new Error("You must include the name of the pet.");
        if (!req.body.species) throw new Error("You must include the species of the pet.");
        if (!req.body.breed) throw new Error("You must include the breed of the pet.");
        if (!req.body.age) throw new Error("You must include the approximate age of the pet.");
        if (!req.body.gender) throw new Error("You must include the gender of the pet.");
        if (!req.body.size) throw new Error("You must include the size of the pet.");
        if (!req.body.color) throw new Error("You must include the color of the pet.");
        if (!req.body.status) throw new Error("You must include the status of the pet.");
        if (!req.body.description) throw new Error("You must include a description of the pet");

        const {
            name,
            species,
            breed,
            age,
            gender,
            size,
            color,
            fee,
            status,
            description,
            expireDate,
            lastSeenLocation,
            lastSeenDate,
            userId,
            shelterId,
        } = req.body;



        // creates new petable pet
        const newPet = await Pet.create({
            name,
            species,
            breed,
            age,
            gender,
            size,
            color,
            fee,
            status,
            description,
            expireDate,
            lastSeenLocation,
            lastSeenDate,
            userId,
            shelterId,
        });

        if (!newPet) throw Error("Unable to create a shelter. please try again");

        let result: GoodPet = {

            id: 0,
            name: "",
            species: "",
            breed: "",
            age: "",
            gender: "",
            size: "",
            fee: 0,
            status: "",
            description: "",
            lastSeenLocation: "",
            lastSeenDate: "",
            color: "",
            expireDate: "",
            createdAt: "",
            updatedAt: "",
            userId: 0,
            shelterId: 0,

        };

        let newPetJson = newPet.toJSON();
        result.id = newPetJson.id;
        result.name = newPetJson.name;
        result.species = newPetJson.species;
        result.breed = newPetJson.breed;
        result.age = newPetJson.age;
        result.gender = newPetJson.gender;
        result.size = newPetJson.size;
        result.fee = Number(newPetJson.fee);
        result.status = newPetJson.status;
        result.lastSeenLocation = newPetJson.lastSeenLocation;
        result.lastSeenDate = newPetJson.lastSeenDate;
        result.color = newPetJson.color;
        result.expireDate = newPetJson.expireDate;
        result.description = newPetJson.description;
        result.userId = newPetJson.userId;
        result.shelterId = newPetJson.shelterId;
        result.createdAt = dateConverter(newPetJson.createdAt);
        result.updatedAt = dateConverter(newPetJson.updatedAt);


        res.status(201);
        return res.json(result);
    } catch (e)
    {
        return next(e);
    }
});


// backend/routes/api/users.js

router.post(
    '/:petId/images',
    singleMulterUpload("image"),
    async (req: any, res: any) => {
      const petId = req.params.petId;
      const imageUrl = await singleFileUpload(req.file);
      const petImage = await db.PetImage.create({ 
        petId: Number(petId),
        url: imageUrl,
        preview: false
      });
    
      return res.json({ imageUrl, petImage });
    }
  );


  router.post(
    '/:petId/multiple',
    multipleMulterUpload("image"),
    async (req: any, res: any) => {

      const imageUrls = await multiplePublicFileUpload(req.files);

      const petImages = await Promise.all(
      imageUrls.map((url: string) =>
        db.PetImage.create({
            petId: Number(req.params.petId),
            url: url,
            preview: false
        })
      )
    );
      return res.json({ imageUrls, petImages });
    }
  );


//update an petable pet

router.put('/:petId', async (req: CustomeRequest, res: Response, next: NextFunction) =>
{
    try
    {
        if (req.params.petId)
        {
            let petId = req.params.petId;

            if (!req.body) throw new NoResourceError('You must pass in a body to update an petable pet', 400);

            let { newName, newSpecies, newBreed, newAge, newGender, newSize, newFee, newStatus, newDescription, newUserId, newShelterId, newColor, newExpireDate, newLastSeenLocation, newLastSeenDate } = req.body;


            const oldPet = await Pet.findByPk(petId);
            if (!oldPet) throw new NoResourceError("Adoptable pet couldn't be found, 404");
            let { ...response } = oldPet.toJSON();

            //User.id is questionable - should be userId?
            if (response.userId !== oldPet.userId) {
                throw new UnauthorizedError("You are not authorized to edit this shelter", 401);
            } else
            
            if (newName && response.name !== newName) {
                oldPet.name = newName;
                response.name = newName;
            }
            if (newSpecies && response.species !== newSpecies) {
                oldPet.species = newSpecies;
                response.species = newSpecies;
            }
            if (newBreed && response.breed !== newBreed) {
                oldPet.breed = newBreed;
                response.breed = newBreed;
            }
            if (newAge && response.age !== newAge) {
                oldPet.age = newAge;
                response.age = newAge;
            }
            if (newGender && response.gender !== newGender) {
                oldPet.gender = newGender;
                response.gender = newGender;
            }
            if (newSize && response.size !== newSize) {
                oldPet.size = newSize;
                response.size = newSize;
            }
            if (newFee && response.fee !== newFee) {
                oldPet.fee = newFee;
                response.fee = newFee;
            }
            if (newStatus && response.status !== newStatus) {
                oldPet.status = newStatus;
                response.status = newStatus;
            }
            if (newColor && response.newColor !== newColor) {
                oldPet.newColor = newColor;
                response.newColor = newColor;
            }
            if (newExpireDate && response.expireDate !== newExpireDate) {
                oldPet.expireDate = newExpireDate;
                response.expireDate = newExpireDate;
            }
            if (newLastSeenDate && response.lastSeenDate !== newLastSeenDate) {
                oldPet.lastSeenDate = newLastSeenDate;
                response.lastSeenDate = newLastSeenDate;
            }
            if (newLastSeenLocation && response.lastSeenLocation !== newLastSeenLocation) {
                oldPet.lastSeenLocation = newLastSeenLocation;
                response.lastSeenLocation = newLastSeenLocation;
            }
            if (newDescription && response.description !== newDescription) {
                oldPet.description = newDescription;
                response.description = newDescription;
            }
            if (newUserId && response.userId !== newUserId) {
                oldPet.userId = newUserId;
                response.userId = newUserId;
            }
            if (newShelterId && response.shelterId !== newShelterId) {
                oldPet.shelterId = newShelterId;
                response.shelterId = newShelterId;
            }
            

                //newDescription, newUserId, newShelterId
                await oldPet.save();
                res.status(200);
                res.json(oldPet);
          
            } else
                {
                    throw new NoResourceError("Adoptable pet couldn't be found", 404);
                }
            } catch (error)  {
                return res.json({ message: error });
            }
            });

//delete an petable pet

router.delete('/:petId', async (req: CustomeRequest, res: Response, next: NextFunction) =>
{

    try
    {
        if (!req.user) throw new UnauthorizedError('You must be signed in to perform this action');
        let userId = req.user.id;
        let petId: string | number = req.params.petId;
        if (!petId) throw new Error('Please pass in a valid shelter id');

        petId = Number(petId);
        let pet = await Pet.findByPk(petId);
        if (!pet) throw new NoResourceError("Petable pet couldn't be found", 404);
        let petJSON = await pet.toJSON();
        if (petJSON.userId !== userId) throw new ForbiddenError('Forbidden: This is not your petable pet!');
        pet.destroy();
        return res.json(pet);
    } catch (e)
    {
        return next(e);
    }
});

export = router;


