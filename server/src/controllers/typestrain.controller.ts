import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { UserModel, TypeStrainModel } from '../models';
import { TypeStrainParamsInterface, TypeStrainBodyInterface, TypeStrainPaginationQueryInterface } from '../data/interfaces/typestrain';
import { UserRoles } from '../data/enums/user.enum';
import mongoose from 'mongoose';
import { parseJwt } from '../utils';

export const CreateTypeStrain: RequestHandler<unknown, unknown, TypeStrainBodyInterface, unknown> = async (req, res, next) => {
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
            throw createHttpError(401, "You cannot create a type strain");
        }

        const typeStrainExists = await TypeStrainModel.findOne({ name });

        if (typeStrainExists) {
            throw createHttpError(404, "A type strain with that name already exists");
        }

        const newTypeStrain = await TypeStrainModel.create({
            name,
        });

        res.status(200).json(newTypeStrain);
    } catch (error) {
        next(error);
    }
};

export const GetTypeStrainById: RequestHandler<TypeStrainParamsInterface, unknown, unknown, unknown> = async (req, res, next) => {
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
            throw createHttpError(401, "You cannot access the type strain data");
        }

        const typeStrain = await TypeStrainModel.findOne({ _id: id });

        if (!typeStrain) {
            throw createHttpError(404, "Type strain not found");
        }

        res.status(200).json(typeStrain);
    } catch (error) {
        next(error);
    }
};

export const GetTypeStrainPagination: RequestHandler<unknown, unknown, unknown, TypeStrainPaginationQueryInterface> = async (req, res, next) => {
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
            throw createHttpError(401, "You cannot access the type strain data");
        }

        let typeStrain;

        let query = {};

        if(name_like) {
            query = {...query, name: { $regex: name_like}}
        }

        if (_order && _sort) {
            typeStrain = await TypeStrainModel.find(query)
            .limit(_end)
            .skip(_start)
            .sort({[_sort]: _order})
            .exec();
        } else{
            typeStrain = await TypeStrainModel.find(query)
            .limit(_end)
            .skip(_start)
            .exec();
        }

        const totalCount = await TypeStrainModel.find(query).countDocuments();

        res.append('X-Total-Count', totalCount.toString());
        res.append('Access-Control-Expose-Headers', 'X-Total-Count');

        res.status(200).json(typeStrain);
    } catch (error) {
        next(error);
    }
}

export const EditTypeStrain: RequestHandler<TypeStrainParamsInterface, unknown, TypeStrainBodyInterface, unknown> = async (req, res, next) => {
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
            throw createHttpError(401, "You cannot edit this type strain");
        }

        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid type strain Id");
        }

        const typeStrain = await TypeStrainModel.findById(id).exec();

        if (!typeStrain) {
            throw createHttpError(404, "Types strain not found");
        }

        if (name !== undefined) {
            const typeStrainExists = await TypeStrainModel.findOne({name, _id : {$ne: typeStrain._id}});

            if (typeStrainExists && typeStrainExists._id !== typeStrainExists._id) {
                throw createHttpError(404, "A type strain with that name already exists");
            }

            typeStrain.name = name;
        }

        const updatedTypeStrain = await typeStrain.save();

        res.status(200).json(updatedTypeStrain);
    } catch (error) {
        next(error);
    }
}

export const DeleteTypeStrain: RequestHandler<TypeStrainParamsInterface, unknown, unknown, unknown>  = async (req, res, next) => {
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
            throw createHttpError(401, "You cannot delete this type strain");
        }

        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid type strain id");
        }

        const typeStrain = await TypeStrainModel.findById(id).exec();

        if (!typeStrain) {
            throw createHttpError(404, "Type strain not found");
        }

        await TypeStrainModel.deleteOne({_id: id});

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}