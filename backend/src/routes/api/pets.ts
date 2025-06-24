import { NextFunction, Request, Response } from "express";
import { CustomeRequest } from "../../typings/express";
import { validateQueryParams } from "../../utils/validation";
import db from '../../db/models';
import { dateConverter } from "../../utils/date-conversion";
import { GoodPet } from "../../typings/data";
import { ForbiddenError, NoResourceError, UnauthorizedError } from "../../errors/customErrors";
import { requireAuth } from "../../utils/auth";
const {	multiplePublicFileUpload, multipleMulterUpload} = require('../../awsS3');



const { Pet, Shelter, User } = db;
const router = require('express').Router();


// Get all pets

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
          
            return {
                ...petJson,
                expireDate: petJson.expireDate,
                createdAt: dateConverter(petJson.createdAt),
                updatedAt: dateConverter(petJson.updatedAt)
           };
        };

        const byId = pets.reduce((acc: any, pet: any) => {
            const transformed = petTransform(pet);
            acc[transformed.id] = transformed;
            return acc;
        }, {});
        // const allPets: any[] = [];

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

        if (!pet) throw new NoResourceError("Pet couldn't be found", 404);
        res.status(200);
        res.json(pet);
    } catch (e)
    {
        return next(e);
    }
});

// Get pets owned by current user: 

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

// get a pet by shelter
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



router.post('/images/:petId', multipleMulterUpload('image'), async (req: any, res: any, next: NextFunction) => {
		try {
			const petId = req.params.petId;

			if (!req.files || req.files.length === 0) {
				return res.status(400).json({ errors: ['No images uploaded'] });
			}

			const imageUrls = await multiplePublicFileUpload(req.files);

			const petImages = await Promise.all(
				imageUrls.map((url: string, index: number) =>
					db.PetImage.create({
						petId: Number(petId),
						url: url,
						preview: index === 0,
					}),
				),
			);

			return res.json({
				success: true,
				imageUrls,
				petImages,
			});
		} catch (error: any) {
			console.error('Image upload error:', error);
			return res.status(500).json({
				errors: [error.message || 'Failed to upload images'],
			});
		}
	},
);

//update an pet

router.put('/:petId', requireAuth, async (req: CustomeRequest, res: Response, next: NextFunction) =>
{
    try
    {
        if (req.params.petId)
        {
            let petId = req.params.petId;

            if (!req.body) throw new NoResourceError('You must pass in a body to update a pet', 400);

            let { name, species, breed, age, gender, size, fee, status, description, userId, shelterId, color, expireDate, lastSeenLocation, lastSeenDate } = req.body;


            const oldPet = await Pet.findByPk(petId);
            if (!oldPet) throw new NoResourceError("Adoptable pet couldn't be found, 404");
            let { ...response } = oldPet.toJSON();

            if (!req.user) {
                throw new UnauthorizedError("You must be logged in to edit pets", 401)
            }

            let hasCred = false;

            if (req.user.id === oldPet.userId || req.user.role === 'Admin' || req.user.role === 'KPA Staff' || req.user.role === 'KPA Volunteer' || req.user.shelterId === shelterId) {
                hasCred = true;
            }

            //User.id is questionable - should be userId?
            if (!hasCred) {
                throw new UnauthorizedError("You are not authorized to edit this pet", 401);
            } else
            
            if (name && response.name !== name) {
                oldPet.name = name;
                response.name = name;
            }
            if (species && response.species !== species) {
                oldPet.species = species;
                response.species = species;
            }
            if (breed && response.breed !== breed) {
                oldPet.breed = breed;
                response.breed = breed;
            }
            if (age && response.age !== age) {
                oldPet.age = age;
                response.age = age;
            }
            if (gender && response.gender !== gender) {
                oldPet.gender = gender;
                response.gender = gender;
            }
            if (size && response.size !== size) {
                oldPet.size = size;
                response.size = size;
            }
            if (fee && response.fee !== fee) {
                oldPet.fee = fee;
                response.fee = fee;
            }
            if (status && response.status !== status) {
                oldPet.status = status;
                response.status = status;
            }
            if (color && response.color !== color) {
                oldPet.color = color;
                response.color = color;
            }
            if (expireDate && response.expireDate !== expireDate) {
                oldPet.expireDate = expireDate;
                response.expireDate = expireDate;
            }
            if (lastSeenDate && response.lastSeenDate !== lastSeenDate) {
                oldPet.lastSeenDate = lastSeenDate;
                response.lastSeenDate = lastSeenDate;
            }
            if (lastSeenLocation && response.lastSeenLocation !== lastSeenLocation) {
                oldPet.lastSeenLocation = lastSeenLocation;
                response.lastSeenLocation = lastSeenLocation;
            }
            if (description && response.description !== description) {
                oldPet.description = description;
                response.description = description;
            }
            if (userId && response.userId !== userId) {
                oldPet.userId = userId;
                response.userId = userId;
            }
            if (shelterId && response.shelterId !== shelterId) {
                oldPet.shelterId = shelterId;
                response.shelterId = shelterId;
            }
            
                await oldPet.save();

            const updatePetWithImages = await Pet.findByPk(petId, {
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


                res.status(200).json(updatePetWithImages);
          
            } else
                {
                    throw new NoResourceError("Adoptable pet couldn't be found", 404);
                }
            } catch (error)  {
                return next(error)
               
            }
            });

//delete a pet

router.delete('/:petId', requireAuth, async (req: CustomeRequest, res: Response, next: NextFunction) =>{
    try
    {
        if (!req.user) {
            throw new UnauthorizedError("You must be logged in to delete pets", 304)
        }

        let hasCred = false;

        if (req.user.id === req.body.userId || req.user.role === 'Admin' || req.user.role === 'KPA Staff' || req.user.role === 'KPA Volunteer' || req.user.shelterId === req.body.shelterId) {
            hasCred = true;
        }


        let petId: string | number = req.params.petId;
        if (!petId) throw new Error('No pet Id found');

        petId = Number(petId);
        let pet = await Pet.findByPk(petId);
        if (!pet) throw new NoResourceError("Pet couldn't be found", 404);
        if (!hasCred) throw new ForbiddenError(`Forbidden! You don't have the credentials to delete this pet`, 304);
        pet.destroy();
        return res.json(pet);
    } catch (e)
    {
        return next(e);
    }
});

router.delete(
	'/images/:imageId',
	async (req: any, res: any, next: NextFunction) => {
		try {
			const imageId = req.params.imageId;

			const image = await db.PetImage.findByPk(imageId);
			if (!image) {
				return res.status(404).json({ errors: ['Pet image not found'] });
			}

			await image.destroy();

			return res.json({ success: true });
		} catch (error: any) {
			console.error('Image delete error:', error);
			return res.status(500).json({
				errors: [error.message || 'Failed to delete image'],
			});
		}
	},
);

export = router;


