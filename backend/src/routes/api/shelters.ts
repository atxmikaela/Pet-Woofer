import { NextFunction, Request, Response } from "express";
import { CustomeRequest } from "../../typings/express";
import { validateQueryParams } from "../../utils/validation";
import db from '../../db/models';
import { Op } from 'sequelize';
import { dateConverter } from "../../utils/date-conversion";
import { GoodShelter } from "../../typings/data";
import { ForbiddenError, NoResourceError, UnauthorizedError } from "../../errors/customErrors";
import {requireAuth} from "../../utils/auth";


const { Shelter, User } = db;
const router = require('express').Router();


// Get all shelters

router.get('/', validateQueryParams, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const shelters = await Shelter.findAll();

        const shelterTransform = shelters.map((shelter: any) => {
            const shelterJson = shelter.toJSON();
            return {
                ...shelterJson,
                createdAt: dateConverter(shelterJson.createdAt),
                updatedAt: dateConverter(shelterJson.updatedAt)
            };
        });

        const byId = shelterTransform.reduce((acc: any, shelter: any) => {
            acc[shelter.id] = shelter;
            return acc;
        }, {});

        res.status(200);
        res.json({ byId });
    } catch (e) {
        return next(e);
    }
});

// Get all shelters owned by current user: 




router.post('/', async (req: CustomeRequest, res: Response, next: NextFunction) =>
{
    try
    {
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
        if(shelter && name)
        {
            throw new Error("Shelter already exists with that name");
        }
        if(shelter && email)
        {
            throw new Error("Shelter already exists with that email address");
        }
        if(shelter && phone)
        {
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

        if (!newShelter) throw Error("Unable to create a shelter. please try again");

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
    } catch (e)
    {
        return next(e);
    }
} );

//update a shelter

router.put('/:shelterId', requireAuth, async (req: CustomeRequest, res: Response, next: NextFunction) =>
{
    try
    {
        if(req.params.shelterId)
        {
            let shelterId = req.params.shelterId;

            if(!req.body) throw new NoResourceError('You must pass in a body to update a Shelter', 400);

            let { name, phone, email, website, address, city, state, zip } = req.body;


            const oldShelter = await Shelter.findByPk(shelterId);
            if(!oldShelter) throw new NoResourceError("Shelter couldn't be found, 404");
            let { ...response } = oldShelter.toJSON();

            if (!req.user) {
							throw new UnauthorizedError(
								'You must be logged in to edit shelters',
								401,
							);
						}

            let hasCred = false;

						if (
							req.user?.id === oldShelter.userId ||
							req.user?.role === 'Admin' ||
							req.user?.role === 'KPA Staff'
														
						) {
							hasCred = true;
						}
           
            if(!hasCred)
            {
                throw new UnauthorizedError("You are not authorized to edit this shelter", 401);
            } else
            {
                if(name && response.name !== name)
                {
                    oldShelter.name = name;
                    response.name = name;
                }
                if(phone && response.phone !== phone)
                {
                    oldShelter.phone = phone;
                    response.phone = phone;
                }
                if(email && response.email !== email)
                {
                    oldShelter.email = email;
                    response.email = email;
                }
                if(website && response.website !== website)
                {
                    oldShelter.website = website;
                    response.website = website;
                }
                if(address && response.address !== address)
                {
                    oldShelter.address = address;
                    response.address = address;
                }
                if(city && response.city !== city)
                {
                    oldShelter.city = city;
                    response.city = city;
                }
                if(state && response.state !== state)
                {
                    oldShelter.state = state;
                    response.state = state;
                }
                if(zip && response.zip !== zip)
                {
                    oldShelter.zip = zip;
                    response.zip = zip;
                }
                await oldShelter.save();
                res.status(200);
                res.json(oldShelter);
            }

        } else
        {
            throw new NoResourceError("Shelter couldn't be found", 404);
        }
    } catch (error)
    {
        return next(error);
    }
});

//delete a shelter

router.delete('/:shelterId', async (req: CustomeRequest, res: Response, next: NextFunction) =>
{

    try
    {
        if(!req.user) throw new UnauthorizedError('You must be signed in to perform this action');

        let userId = req.user.id;

        let shelterId: string | number = req.params.shelterId;

        if(!shelterId) throw new Error('Please pass in a valid shelter id');

        shelterId = Number(shelterId);

        let shelter = await Shelter.findByPk(shelterId);

        if(!shelter) throw new NoResourceError("Shelter couldn't be found", 404);

        let shelterJSON = await shelter.toJSON();

        let hasCred = false;
				if (
					req.user.id === shelterJSON.userId ||
					req.user.role === 'Admin'
				) {
					hasCred = true;
				}

				if (!hasCred) {
					throw new ForbiddenError('Forbidden: You cannot delete this shelter');
				}

        shelter.destroy();
        return res.json(shelter);
    } catch (e)
    {
        return next(e);
    }
});

export = router;


