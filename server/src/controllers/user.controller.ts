import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { UserModel } from '../models';
import { CreateUserBodyInterface, GetUserByIdParamsInterface } from '../data/interfaces/user';

export const CreateUser: RequestHandler<unknown, unknown, CreateUserBodyInterface, unknown> = async (req, res, next) => {
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

export const GetUserById: RequestHandler<GetUserByIdParamsInterface, unknown, unknown, unknown> = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await UserModel.findOne({ _id: id }).populate("allProperties");

        if (user) {
            res.status(200).json(user);
        } else {
            throw createHttpError(404, "User not found");
        }
    } catch (error) {
        next(error);
    }
};

export const GetUserList: RequestHandler<unknown, unknown, unknown, unknown> = async (req, res, next) => {
    try {
        const users = await UserModel.find().exec();

        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}