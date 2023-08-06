import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { UserModel } from '../models';
import { UserParamsInterface, UserBodyInterface } from '../data/interfaces/user';
import mongoose from 'mongoose';
import { PaginationQueryInterface } from '../data/interfaces/global';

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
    try {
        const { id } = req.params;

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

export const GetUserList: RequestHandler<unknown, unknown, unknown, PaginationQueryInterface> = async (req, res, next) => {
    const {
        _end,
        _order,
        _start,
        _sort
    } = req.query;

    let users;

    try {
        if (_order && _sort) {
            users = await UserModel.find()
            .select("+email")
            .limit(_end)
            .skip(_start)
            .sort({[_sort]: _order})
            .exec();
        } else{
            users = await UserModel.find()
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
    const userId = req.params.id;

    const {
        role
    } = req.body;

    try {
        if (!mongoose.isValidObjectId(userId)) {
            throw createHttpError(400, "Invalid User Id");
        }

        const user = await UserModel.findById(userId).select("+email").exec();

        if (!user) {
            throw createHttpError(404, "User not found");
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