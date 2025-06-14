import { NextFunction, Request, Response } from "express";
import { CustomeRequest } from "../../typings/express";
import { validateQueryParams } from "../../utils/validation";
import db from '../../db/models';
import { Op } from 'sequelize';
import { dateConverter } from "../../utils/date-conversion";
import { GoodShelter } from "../../typings/data";
import { ForbiddenError, NoResourceError, UnauthorizedError } from "../../errors/customErrors";


const {Shelter, User} = db;
const router = require('express').Router();


// Get all shelters

router.get('/', validateQueryParams, async(req:Request, res: Response, next: NextFunction) => {
    try {
        const shelters = await Shelter.findAll();

        const shelterTransform = shelters.map((shelter:any) => {
            const shelterJson = shelter.toJSON()
            const { ...res } = shelterJson;
            res.createdAt = dateConverter(res.createdAt);
            res.updatedAt = dateConverter(res.updatedAt);
            return res;
    })
    res.status(200);
    res.json({
        shelters: shelterTransform,
    })
    } catch (e) {
        return next(e);
    }
})

// Get all shelters owned by current user: 

router.get('/:userId', async(req:CustomeRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;
        const shelters = await Shelter.findAll({
            where: {
                userId: userId
            },
            include: [
                {model: User, as: "Owner"}
            ]
        });

        const shelterTransform = shelters.map((shelter:any) => {
            const shelterJson = shelter.toJSON();
            const {Owner, ...res} = shelterJson;
            
            res.ownerId = Owner.id;
            res.createdAt = dateConverter(res.createdAt);
            res.updatedAt = dateConverter(res.updatedAt);
            return res;
        })

        res.status(200);
        res.json({Shelters: shelterTransform});
    } catch (e) {
        res.json({message: e})
    }
})


router.post('/', async(req:CustomeRequest, res:Response, next: NextFunction) => {
    try{
        if(!req.body) throw new Error("An error occured processing your request. Please try again");
        if(!req.body.userId) throw new Error("You must be signed in to add a shelter.");
        if(!req.body.name) throw new Error("You must include the name of the shelter.");
        if(!req.body.address) throw new Error("You must include the address of the shelter.");
        if(!req.body.city) throw new Error("You must include the city of the shelter.");
        if(!req.body.state) throw new Error("You must include the state of the shelter.");
        if(!req.body.zip) throw new Error("You must include the zip of the shelter.");
        if(!req.body.phone) throw new Error("You must include the phone number of the shelter.");
        if(!req.body.email) throw new Error("You must include the email of the shelter.");
        if(!req.body.website) throw new Error("You must include the website of the shelter.");
        if(!req.body.description) throw new Error("You must include a description of the shelter");

        const {
            name,
            address,
            city,
            state,
            zip,
            lat,
            lon,
            phone,
            email,
            website,
            description,
            userId
        } = req.body;

        // check to see if shelter exists with name, email, or phone number
        let shelter = await Shelter.findOne({where: {[Op.or]: [{name}, {email}, {phone}]}});
        if (shelter && name){ 
            throw new Error("Shelter already exists with that name");
        }
        if (shelter && email){ throw new Error("Shelter already exists with that email address");
        }
        if (shelter && phone){        
        throw new Error("Shelter already exists with that phone number");
        }
    

        // creates new shelter
        const newShelter = await Shelter.create({
            name,
            address,
            city,
            state,
            zip,
            lat,
            lon,
            phone,
            email,
            website,
            description,
            userId,
    });
    
        if(!newShelter) throw Error("Unable to create a shelter. please try again");

        let result: GoodShelter = {

            id: 0,
            name: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            lat: 0,
            lon: 0,
            phone: "",
            email: "",
            website: "",
            description: "",
            createdAt: "",
            updatedAt: "",
            userId: 0,

        };

        let newShelterJson = newShelter.toJSON();
        result.id = newShelterJson.id;
        result.name = newShelterJson.name;
        result.address = newShelterJson.address;
        result.city = newShelterJson.city;
        result.state = newShelterJson.state;
        result.zip = newShelterJson.zip;
        result.lat = Number(newShelterJson.lat);
        result.lon = Number(newShelterJson.lon);
        result.phone = newShelterJson.phone;
        result.email = newShelterJson.email;
        result.website = newShelterJson.website;
        result.description = newShelterJson.website;
        result.userId = newShelterJson.userId;
        result.createdAt = dateConverter(newShelterJson.createdAt);
        result.updatedAt = dateConverter(newShelterJson.updatedAt);

        res.status(201);
        return res.json(result);
    } catch (e){
        return next(e);
    }
});

//update a shelter

router.put('/:shelterId', async(req:CustomeRequest, res: Response, next: NextFunction) => {
    try {
        if(req.params.shelterId){
            let shelterId = req.params.shelterId;

            if(!req.body) throw new NoResourceError('You must pass in a body to update a Shelter', 400);

            let {newName, newPhone, newEmail, newWebsite, newAddress, newCity, newState, newZip} = req.body;
        

        const oldShelter = await Shelter.findByPk(shelterId);
        if(!oldShelter) throw new NoResourceError("Shelter couldn't be found, 404");
        let {...response} = oldShelter.toJSON();

        //User.id is questionable - should be userId?
        if(response.userId !== oldShelter.userId){ 
            throw new UnauthorizedError("You are not authorized to edit this shelter", 401);
        } else {
            if(newName && response.name !== newName){
                oldShelter.name = newName;
                response.name = newName;
            }
            if(newPhone && response.phone !== newPhone){
                oldShelter.phone = newPhone;
                response.phone = newPhone;
            }
            if(newEmail && response.email !== newEmail){
                oldShelter.email = newEmail;
                response.email = newEmail;
            }
            if(newWebsite && response.website !== newWebsite){
                oldShelter.website = newWebsite;
                response.website = newWebsite;
            }
            if(newAddress && response.address !== newAddress){
                oldShelter.address = newAddress;
                response.address = newAddress;
            }
            if(newCity && response.city !== newCity){
                oldShelter.city = newCity;
                response.city = newCity;
            }
            if(newState && response.state !== newState){
                oldShelter.state = newState;
                response.state = newState;
            }
            if(newZip && response.zip !== newZip){
                oldShelter.zip = newZip;
                response.zip = newZip;
            }
            await oldShelter.save();
            res.status(200);
            res.json(oldShelter);
        }

        } else {
            throw new NoResourceError("Shelter couldn't be found", 404);
        }
    } catch (error) {
        return res.json({message: error});
    }
});

//delete a shelter

    router.delete('/:shelterId', async(req:CustomeRequest, res: Response, next: NextFunction) => {

        try {
            if(!req.user) throw new UnauthorizedError('You must be signed in to perform this action');
            let userId = req.user.id;
            let shelterId: string | number = req.params.shelterId;
            if(!shelterId) throw new Error('Please pass in a valid shelter id');

            shelterId = Number(shelterId);
            let shelter = await Shelter.findByPk(shelterId);
            if(!shelter) throw new NoResourceError("Shelter couldn't be found", 404);
            let shelterJSON = await shelter.toJSON();
            if(shelterJSON.userId !== userId) throw new ForbiddenError('Forbidden: This is not your shelter');
            shelter.destroy();
            return res.json(shelter);
        } catch (e) {
            return next (e);
        }
    });

    export = router;


