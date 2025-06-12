import { NextFunction, Request, Response } from "express";
import { CustomeRequest } from "../../typings/express";
import { validateQueryParams } from "../../utils/validation";

import db from '../../db/models';
import { Op } from 'sequelize';
import { dateConverter } from "../../utils/date-conversion";
import { GoodShelter } from "../../typings/data";
import { nextTick } from "process";


const {Shelter, User} = db;
const router = require('express').router();


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

router.get('/current/:userId', async(req:CustomeRequest, res: Response, next: NextFunction) => {
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
            description
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

        let createdAt = new Date(newShelterJson.createdAt);
        let updatedAt = new Date(newShelterJson.updatedAt);

        let resCreatedDate = `${createdAt.getFullYear()} - ${createdAt.getMonth()} - ${createdAt.getDate()}`;
        let resUpdatedDate = `${updatedAt.getFullYear()} - ${updatedAt.getMonth()} - ${updatedAt.getDate()}`;

        result.createdAt = resCreatedDate;
        result.updatedAt = resUpdatedDate;

        res.status(201);
        return res.json(result);
    } catch (e){
        return next(e);
    }
});

//update a shelter



