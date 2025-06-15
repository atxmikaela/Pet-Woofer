import { NextFunction, Request, Response } from "express";
import { CustomeRequest } from "../../typings/express";
import { validateQueryParams } from "../../utils/validation";
import db from '../../db/models';
import { Op } from 'sequelize';
import { dateConverter } from "../../utils/date-conversion";
import { GoodAdopt } from "../../typings/data";
import { ForbiddenError, NoResourceError, UnauthorizedError } from "../../errors/customErrors";


const {Adopt, Shelter, User} = db;
const router = require('express').Router();


// Get all adoptable pets

router.get('/', validateQueryParams, async(req:Request, res: Response, next: NextFunction) => {
    try {
        const adopts = await Adopt.findAll();

        const adoptTransform = adopts.map((adopt:any) => {
            const adoptJson = adopt.toJSON()
            const { ...res } = adoptJson;
            res.createdAt = dateConverter(res.createdAt);
            res.updatedAt = dateConverter(res.updatedAt);
            return res;
    });

    const byId: any = {};
    const allAdopts: any[] = [];

    adoptTransform.forEach((adopt: any) => {
        byId[adopt.id] = adopt;
        allAdopts.push(adopt);
    });


    res.status(200);
    res.json({ byId, allAdopts });
    } catch (e) {
        return next(e);
    }
})

// Get one adoptable pet by adoptable pet ID:

router.get('/:id', validateQueryParams, async(req:Request, res: Response, next: NextFunction) => {
    try {
        const adoptId = req.params.id;
        const adopt = await Adopt.findByPk(adoptId)

    if ( !adopt ) throw new NoResourceError( "Adoptable pet couldn't be found", 404);
    res.status(200);
    res.json(adopt);
    } catch (e) {
        return next(e);
    }
})

// Get all adoptable pets owned by current user: 

router.get('/my-adopts/:userId', async(req:CustomeRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;
        const adopts = await Adopt.findAll({
            where: {
                userId: userId
            },
            include: [
                {model: User, as: "Owner"}
            ]
        });

        const adoptTransform = adopts.map((adopt:any) => {
            const adoptJson = adopt.toJSON();
            const {Owner, ...res} = adoptJson;
            
            res.ownerId = Owner.id;
            res.createdAt = dateConverter(res.createdAt);
            res.updatedAt = dateConverter(res.updatedAt);
            return res;
        })

        res.status(200);
        res.json({Adopts: adoptTransform});
    } catch (e) {
        res.json({message: e})
    }
})

// get an adoptable pet by shelter
router.get('/by-shelter/:shelterId', async(req:CustomeRequest, res: Response, next: NextFunction) => {
    try {
        const shelterId = req.params.shelterId;
        const adopts = await Adopt.findAll({
            where: {
                shelterId: shelterId
            },
            include: [
                {model: Shelter, as: "Rescue"}
            ]
        });

        const adoptTransform = adopts.map((adopt:any) => {
            const adoptJson = adopt.toJSON();
            const {Rescue, ...res} = adoptJson;
            
            res.rescueId = Rescue.id;
            res.createdAt = dateConverter(res.createdAt);
            res.updatedAt = dateConverter(res.updatedAt);
            return res;
        })

        res.status(200);
        res.json({Adopts: adoptTransform});
    } catch (e) {
        res.json({message: e})
    }
})


router.post('/', async(req:CustomeRequest, res:Response, next: NextFunction) => {
    try{
        if(!req.body) throw new Error("An error occured processing your request. Please try again");
        if(!req.body.userId) throw new Error("You must be signed in to add a rescued pet.");
        if(!req.body.shelterId) throw new Error("You must include the shelter to add a rescued pet.");
        if(!req.body.name) throw new Error("You must include the name of the pet.");
        if(!req.body.species) throw new Error("You must include the species of the pet.");
        if(!req.body.breed) throw new Error("You must include the breed of the pet.");
        if(!req.body.age) throw new Error("You must include the approximate age of the pet.");
        if(!req.body.gender) throw new Error("You must include the gender of the pet.");
        if(!req.body.size) throw new Error("You must include the size of the pet.");
        if(!req.body.fee) throw new Error("You must include the fee to adopt the pet.");
        if(!req.body.status) throw new Error("You must include the status of the pet.");
        if(!req.body.description) throw new Error("You must include a description of the pet");

        const {
            name,
            species,
            breed,
            age,
            gender,
            size,
            fee,
            status,
            description,
            userId,
            shelterId,
        } = req.body;



        // creates new adoptable pet
        const newAdopt = await Adopt.create({
            name,
            species,
            breed,
            age,
            gender,
            size,
            fee,
            status,
            description,
            userId,
            shelterId,
    });
    
        if(!newAdopt) throw Error("Unable to create a shelter. please try again");

        let result: GoodAdopt = {

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
            createdAt: "",
            updatedAt: "",
            userId: 0,
            shelterId: 0,

        };

        let newAdoptJson = newAdopt.toJSON();
        result.id = newAdoptJson.id;
        result.name = newAdoptJson.name;
        result.species = newAdoptJson.species;
        result.breed = newAdoptJson.breed;
        result.age = newAdoptJson.age;
        result.gender = newAdoptJson.gender;
        result.size = newAdoptJson.size;
        result.fee = Number(newAdoptJson.fee);
        result.status = newAdoptJson.status;
        result.description = newAdoptJson.description;
        result.userId = newAdoptJson.userId;
        result.shelterId = newAdoptJson.shelterId;
        result.createdAt = dateConverter(newAdoptJson.createdAt);
        result.updatedAt = dateConverter(newAdoptJson.updatedAt);


        res.status(201);
        return res.json(result);
    } catch (e){
        return next(e);
    }
});

//update an adoptable pet

router.put('/:adoptId', async(req:CustomeRequest, res: Response, next: NextFunction) => {
    try {
        if(req.params.adoptId){
            let adoptId = req.params.adoptId;

            if(!req.body) throw new NoResourceError('You must pass in a body to update an adoptable pet', 400);

            let {newName, newSpecies, newBreed, newAge, newGender, newSize, newFee, newStatus, newDescription, newUserId, newShelterId} = req.body;
        

        const oldAdopt = await Adopt.findByPk(adoptId);
        if(!oldAdopt) throw new NoResourceError("Adoptable pet couldn't be found, 404");
        let {...response} = oldAdopt.toJSON();

        //User.id is questionable - should be userId?
        if(response.userId !== oldAdopt.userId){ 
            throw new UnauthorizedError("You are not authorized to edit this shelter", 401);
        } else {
            if(newName && response.name !== newName){
                oldAdopt.name = newName;
                response.name = newName;
            }
            if(newSpecies&& response.species !== newSpecies){
                oldAdopt.species = newSpecies
                response.species = newSpecies;
            }
            if(newBreed && response.breed !== newBreed){
                oldAdopt.breed = newBreed;
                response.breed = newBreed;
            }
            if(newAge && response.age !== newAge){
                oldAdopt.age = newAge;
                response.age = newAge;
            }
            if(newGender && response.gender !== newGender){
                oldAdopt.gender = newGender;
                response.gender = newGender;
            }
            if(newSize && response.size !== newSize){
                oldAdopt.size = newSize;
                response.size = newSize;
            }
            if(newFee && response.fee !== newFee){
                oldAdopt.fee = newFee;
                response.fee = newFee;
            }
            if(newStatus && response.status !== newStatus){
                oldAdopt.status = newStatus;
                response.status = newStatus;
            }
            if(newDescription && response.description !== newDescription){
                oldAdopt.description = newDescription;
                response.description = newDescription;
            }
            if(newUserId && response.userId !== newUserId){
                oldAdopt.userId = newUserId;
                response.userId = newUserId;
            }
            if(newShelterId && response.shelterId !== newShelterId){
                oldAdopt.shelterId = newShelterId;
                response.shelterId = newShelterId;
            }


            //newDescription, newUserId, newShelterId
            await oldAdopt.save();
            res.status(200);
            res.json(oldAdopt);
        }

        } else {
            throw new NoResourceError("Adoptable pet couldn't be found", 404);
        }
    } catch (error) {
        return res.json({message: error});
    }
});

//delete an adoptable pet

    router.delete('/:adoptId', async(req:CustomeRequest, res: Response, next: NextFunction) => {

        try {
            if(!req.user) throw new UnauthorizedError('You must be signed in to perform this action');
            let userId = req.user.id;
            let adoptId: string | number = req.params.adoptId;
            if(!adoptId) throw new Error('Please pass in a valid shelter id');

            adoptId = Number(adoptId);
            let adopt = await Adopt.findByPk(adoptId);
            if(!adopt) throw new NoResourceError("Adoptable pet couldn't be found", 404);
            let adoptJSON = await adopt.toJSON();
            if(adoptJSON.userId !== userId) throw new ForbiddenError('Forbidden: This is not your adoptable pet!');
            adopt.destroy();
            return res.json(adopt);
        } catch (e) {
            return next (e);
        }
    });

    export = router;


