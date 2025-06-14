import { NextFunction, Request, Response } from 'express';
import { AuthReq, CustomeRequest } from "../../typings/express";
import { setTokenCookie, requireAuth, restoreUser } from "../../utils/auth";
import { handleValidationErrors } from '../../utils/validation';
const { check } = require('express-validator');
const bcrypt = require('bcryptjs');

const { Op } = require('sequelize')

import db from '../../db/models'
import { errors, RoleErrors } from '../../typings/errors';
import { NoResourceError } from '../../errors/customErrors';
import { error } from 'console';
import { publicDecrypt } from 'crypto';
import { setFlagsFromString } from 'v8';

const { User, UserImage } = db

const router = require('express').Router();

const validateSignup = [
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

router.post('/', validateSignup, async (req: CustomeRequest, res: Response, next: NextFunction) => {

    const { firstName, lastName, email, newRole: role, password, username, isHost, shelterId } = req.body;
    const hashedPassword = bcrypt.hashSync(password);


    let existingUser = await User.findOne({
        where: {
            [Op.or]: {
                username,
                email
            }
        }
    })

    if (existingUser) {
        existingUser = existingUser.toJSON()
        let errors: errors = {}

        if (existingUser.email === email) {
            errors["email"] = "User with that email already exists";
        }
        if (existingUser.username === username) {
            errors["username"] = "User with that username already exists";
        }
        res.status(500)
        return res.json({ message: "User already exists", errors })
    }


    const requesterRole = req.body.requesterRole;
    const newRole = role;
    if (requesterRole) {
        let errors: RoleErrors = {};

        if (!(requesterRole === 'Admin' ||
            (requesterRole === 'KPA Staff' && ['Public', 'KPA Volunteer', 'Shelter Volunteer', 'Shelter Staff'].includes(newRole)) ||
            (requesterRole === 'Shelter Staff' && newRole === 'Shelter Volunteer' ||
                (!requesterRole)
            ))) {
            errors.permission = `${requesterRole} cannot create ${newRole} users`;
            res.status(403)
            return res.json({ message: "Please reach out to KPA if you are unable to add an appropriate user role", errors })
        }
    }
    try {
        const user = await User.create({ firstName, lastName, email, username, role, hashedPassword, isHost: isHost || false });

        const safeUser = await user.getSafeUser();

        if (!['Shelter Staff', 'Shelter Volunteer'].includes(user.role) && 'shelterId' in safeUser) {
            delete safeUser.shelterId;
        }

        await setTokenCookie(res, safeUser);

        return res.json(safeUser);
    } catch (e) {
        return next(e)
    }
}

);

// Restore session user
router.get('/', restoreUser, async (req: AuthReq, res: Response) => {
    const { user } = req;
    
    if (user) {
        const safeUser = await user.getSafeUser();
        return res.json({
            user: safeUser
        });
    } else return res.json({ user: null });
});

//get all users
router.get('/all', async (req: Request, res: Response) => {

    const users = await User.findAll({

    });
    res.json(users)
})



router.delete('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.body.id;
        const demoId = 1;
        const requesterRole = req.body.requesterRole;

        if (Number(userId) === demoId) {
            throw new Error("You can not delete the Demo User account.");
        }

        const user = await User.findByPk(userId);
        if (!user) throw new NoResourceError("No user found with those credentials", 404);
        if (requesterRole) {
            let errors: RoleErrors = {};
            const deleteRole = user.role;
            if (!(requesterRole === 'Admin' ||
                (requesterRole === 'KPA Staff' && ['Public', 'KPA Volunteer', 'Shelter Volunteer', 'Shelter Staff'].includes(deleteRole)) ||
                (requesterRole === 'Shelter Staff' && deleteRole === 'Shelter Volunteer'))) {
                errors.permission = `${requesterRole} cannot delete ${deleteRole} users`;
                res.status(403);
                return res.json({ message: "Please reach out to KPA if you are unable to delete an appropriate user role.", errors })
            }
        }



        await user.destroy();
        res.status(202);
        res.json({ user: null });




    } catch (error) {
        next(error);
    }

})


export = router;
