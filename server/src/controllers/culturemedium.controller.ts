import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { UserModel, CultureMediumModel } from '../models';
import { CultureMediumParamsInterface, CultureMediumBodyInterface, CultureMediumPaginationQueryInterface } from '../data/interfaces/culturemedium';
import { UserRoles } from '../data/enums/user.enum';
import mongoose from 'mongoose';
import { parseJwt } from '../utils';

export const CreateCultureMedium: RequestHandler<unknown, unknown, CultureMediumBodyInterface, unknown> = async (req, res, next) => {
    const token = req.headers.authorization;
    const {
        name
    } = req.body;
    const authenticatedUserEmail = parseJwt(token as string).email;

    try {
        const authenticatedUser = await UserModel.findOne({'email': authenticatedUserEmail}).exec();

        if (!authenticatedUser) {
            throw createHttpError(404, "User not found");
        }

        const authenticatedUserRole = authenticatedUser.role as string;

        if (![UserRoles.Manager as string, UserRoles.Admin as string].includes(authenticatedUserRole)) {
            throw createHttpError(401, "You cannot create a culture medium");
        }

        const cultureMediumExists = await CultureMediumModel.findOne({ name });

        if (cultureMediumExists) {
            throw createHttpError(404, "A culture medium with that name already exists");
        }

        const newCultureMedium = await CultureMediumModel.create({
            name,
        });

        res.status(200).json(newCultureMedium);
    } catch (error) {
        next(error);
    }
};

export const GetCultureMediumById: RequestHandler<CultureMediumParamsInterface, unknown, unknown, unknown> = async (req, res, next) => {
    const token = req.headers.authorization;
    const { id } = req.params;
    const authenticatedUserEmail = parseJwt(token as string).email;

    try {
        const authenticatedUser = await UserModel.findOne({'email': authenticatedUserEmail}).exec();

        if (!authenticatedUser) {
            throw createHttpError(404, "User not found");
        }

        const authenticatedUserRole = authenticatedUser.role as string;

        if (![UserRoles.Manager as string, UserRoles.Admin as string].includes(authenticatedUserRole)) {
            throw createHttpError(401, "You cannot access the culture medium data");
        }

        const cultureMedium = await CultureMediumModel.findOne({ _id: id });

        if (!cultureMedium) {
            throw createHttpError(404, "Culture medium not found");
        }

        res.status(200).json(cultureMedium);
    } catch (error) {
        next(error);
    }
};

export const GetCultureMediumPagination: RequestHandler<unknown, unknown, unknown, CultureMediumPaginationQueryInterface> = async (req, res, next) => {
    console.log(req.query);
    const token = req.headers.authorization;
    const {
        _end,
        _order,
        _start,
        _sort,
        name_like = ""
    } = req.query;
    const authenticatedUserEmail = parseJwt(token as string).email;

    try {
        const authenticatedUser = await UserModel.findOne({'email': authenticatedUserEmail}).exec();

        if (!authenticatedUser) {
            throw createHttpError(404, "User not found");
        }

        const authenticatedUserRole = authenticatedUser.role as string;

        if (![UserRoles.Manager as string, UserRoles.Admin as string].includes(authenticatedUserRole)) {
            throw createHttpError(401, "You cannot access the culture medium data");
        }

        let cultureMedium;

        let query = {};

        if(name_like) {
            query = {...query, name: { $regex: name_like}}
        }

        if (_order && _sort) {
            cultureMedium = await CultureMediumModel.find(query)
            .limit(_end)
            .skip(_start)
            .sort({[_sort]: _order})
            .exec();
        } else{
            cultureMedium = await CultureMediumModel.find(query)
            .limit(_end)
            .skip(_start)
            .exec();
        }

        const totalCount = await CultureMediumModel.find(query).countDocuments();

        res.append('X-Total-Count', totalCount.toString());
        res.append('Access-Control-Expose-Headers', 'X-Total-Count');

        res.status(200).json(cultureMedium);
    } catch (error) {
        next(error);
    }
}

export const EditCultureMedium: RequestHandler<CultureMediumParamsInterface, unknown, CultureMediumBodyInterface, unknown> = async (req, res, next) => {
    const token = req.headers.authorization;
    const { id } = req.params;
    const {
        name
    } = req.body;
    const authenticatedUserEmail = parseJwt(token as string).email;

    try {
        const authenticatedUser = await UserModel.findOne({'email': authenticatedUserEmail}).exec();

        if (!authenticatedUser) {
            throw createHttpError(404, "User not found");
        }

        const authenticatedUserRole = authenticatedUser.role as string;

        if (![UserRoles.Manager as string, UserRoles.Admin as string].includes(authenticatedUserRole)) {
            throw createHttpError(401, "You cannot edit this culture medium");
        }

        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid culture medium Id");
        }

        const cultureMedium = await CultureMediumModel.findById(id).exec();

        if (!cultureMedium) {
            throw createHttpError(404, "Culture medium not found");
        }

        if (name !== undefined) {
            const cultureMediumExists = await CultureMediumModel.findOne({name, _id : {$ne: cultureMedium._id}});

            if (cultureMediumExists && cultureMediumExists._id !== cultureMediumExists._id) {
                throw createHttpError(404, "A culture medium with that name already exists");
            }

            cultureMedium.name = name;
        }

        const updatedCultureMedium = await cultureMedium.save();

        res.status(200).json(updatedCultureMedium);
    } catch (error) {
        next(error);
    }
}

export const DeleteCultureMedium: RequestHandler<CultureMediumParamsInterface, unknown, unknown, unknown>  = async (req, res, next) => {
    const token = req.headers.authorization;
    const { id } = req.params;
    const authenticatedUserEmail = parseJwt(token as string).email;

    try {
        const authenticatedUser = await UserModel.findOne({'email': authenticatedUserEmail}).exec();

        if (!authenticatedUser) {
            throw createHttpError(404, "User not found");
        }

        const authenticatedUserRole = authenticatedUser.role as string;

        if (![UserRoles.Manager as string, UserRoles.Admin as string].includes(authenticatedUserRole)) {
            throw createHttpError(401, "You cannot delete this culture medium");
        }

        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid culture medium id");
        }

        const cultureMedium = await CultureMediumModel.findById(id).exec();

        if (!cultureMedium) {
            throw createHttpError(404, "Culture medium not found");
        }

        await CultureMediumModel.deleteOne({_id: id});

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}