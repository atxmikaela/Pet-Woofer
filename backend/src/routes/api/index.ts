import { NextFunction, Response } from "express";
import { CustomeRequest } from "../../typings/express";
import { restoreUser} from "../../utils/auth";

import db from '../../db/models';


import userRouter from './users';
import sessionRouter from './session';
import shelterRouter from './shelters';
import petsRouter from './pets';
import { ForbiddenError, NoResourceError, UnauthorizedError } from "../../errors/customErrors";
import csurf from "csurf";

const{User, Shelter, Pets, Images} = db;
const router = require('express').Router();
const { environment } = require('../../config');
const isProduction = environment === 'production';




router.use(restoreUser);

router.use((req: any, res: any, next: any) => {
    if (req.path.includes('/uploads') && (req.method === 'POST' || req.method === 'DELETE')) {
        return next();
    }
 
    return csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "lax",
            httpOnly: true
        }
    })(req, res, next);
});


router.use('/session', sessionRouter);
router.use('/users', userRouter);
router.use('/shelters', shelterRouter);
router.use('/pets', petsRouter);




router.get(
    '/restore-user',
    (req:any, res:Response) => {
        return res.json(req.user);
    }
);



export = router;
