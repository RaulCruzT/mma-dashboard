import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { UserModel } from '../models';
import { UserParamsInterface, UserBodyInterface, UserPaginationQueryInterface, UserRoles } from '../data/interfaces/user';
import mongoose from 'mongoose';
import { parseJwt } from '../utils';

export const CreateUser: RequestHandler<unknown, unknown, UserBodyInterface, unknown> = async (req, res, next) => {
    try {
        const {
            name,
            email,
            avatar
        } = req.body;

        const userExists = await UserModel.findOne({ email });

        if (userExists) return res.status(200).json(userExists);

        const newUser = await UserModel.create({
            name,
            email,
            avatar,
        });

        res.status(200).json(newUser);
    } catch (error) {
        next(error);
    }
};

export const GetUserById: RequestHandler<UserParamsInterface, unknown, unknown, unknown> = async (req, res, next) => {
    const token = req.headers.authorization;

    const { id } = req.params;

    const authenticatedUserEmail = parseJwt(token as string).email;

    try {
        const authenticatedUser = await UserModel.findOne({'email': authenticatedUserEmail}).exec();

        if (!authenticatedUser) {
            throw createHttpError(404, "User not found");
        }

        if (authenticatedUser.role !== UserRoles.Admin) {
            throw createHttpError(401, "You cannot access the user data");
        }

        const user = await UserModel.findOne({ _id: id });

        if (user) {
            res.status(200).json(user);
        } else {
            throw createHttpError(404, "User not found");
        }
    } catch (error) {
        next(error);
    }
};

export const GetUserPagination: RequestHandler<unknown, unknown, unknown, UserPaginationQueryInterface> = async (req, res, next) => {
    const token = req.headers.authorization;

    const {
        _end,
        _order,
        _start,
        _sort,
        name_like = "",
        email_like = ""
    } = req.query;

    const authenticatedUserEmail = parseJwt(token as string).email;

    try {
        const authenticatedUser = await UserModel.findOne({'email': authenticatedUserEmail}).exec();

        if (!authenticatedUser) {
            throw createHttpError(404, "User not found");
        }

        if (authenticatedUser.role !== UserRoles.Admin) {
            throw createHttpError(401, "You cannot access the user list");
        }

        let users;

        let query = {};

        if(name_like) {
            query = {...query, name: { $regex: name_like}}
        }

        if(email_like) {
            query = {...query, email: { $regex: email_like}}
        }

        if (_order && _sort) {
            users = await UserModel.find(query)
            .select("+email")
            .limit(_end)
            .skip(_start)
            .sort({[_sort]: _order})
            .exec();
        } else{
            users = await UserModel.find(query)
            .select("+email")
            .limit(_end)
            .skip(_start)
            .exec();
        }

        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

export const EditUser: RequestHandler<UserParamsInterface, unknown, UserBodyInterface, unknown> = async (req, res, next) => {
    const token = req.headers.authorization;
    const userId = req.params.id;

    const {
        role
    } = req.body;

    const authenticatedUserEmail = parseJwt(token as string).email;

    try {
        if (!mongoose.isValidObjectId(userId)) {
            throw createHttpError(400, "Invalid User Id");
        }

        const user = await UserModel.findById(userId).select("+email").exec();

        if (!user) {
            throw createHttpError(404, "User not found");
        }

        const authenticatedUser = await UserModel.findOne({'email': authenticatedUserEmail}).exec();

        if (!authenticatedUser) {
            throw createHttpError(404, "User not found");
        }

        if (authenticatedUser.role !== UserRoles.Admin) {
            throw createHttpError(401, "You cannot edit this user");
        }

        if (role !== undefined) {
            user.role = role;
        }

        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
}