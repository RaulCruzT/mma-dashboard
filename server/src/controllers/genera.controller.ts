import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { UserModel, GeneraModel } from '../models';
import { GeneraParamsInterface, GeneraBodyInterface, GeneraPaginationQueryInterface } from '../data/interfaces/genera';
import { UserRoles } from '../data/enums/user.enum';
import mongoose from 'mongoose';
import { parseJwt } from '../utils';

export const CreateGenera: RequestHandler<unknown, unknown, GeneraBodyInterface, unknown> = async (req, res, next) => {
    const token = req.headers.authorization;
    const {
        name
    } = req.body;
    const authenticatedUserEmail = parseJwt(token as string).email;

    try {
        const authenticatedUser = await UserModel.findOne({'email': authenticatedUserEmail});

        if (!authenticatedUser) {
            throw createHttpError(404, "User not found");
        }

        const authenticatedUserRole = authenticatedUser.role as string;

        if (![UserRoles.Manager as string, UserRoles.Admin as string].includes(authenticatedUserRole)) {
            throw createHttpError(401, "You cannot create a genera");
        }

        const generaExists = await GeneraModel.findOne({ name });

        if (generaExists) {
            throw createHttpError(404, "A genera with that name already exists");
        }

        await GeneraModel.create({
            name,
            creator: authenticatedUser._id
        });

        res.status(200).json({ message: "Genera created successfully" });
    } catch (error) {
        next(error);
    }
};

export const GetGeneraById: RequestHandler<GeneraParamsInterface, unknown, unknown, unknown> = async (req, res, next) => {
    const token = req.headers.authorization;
    const { id } = req.params;
    const authenticatedUserEmail = parseJwt(token as string).email;

    try {
        const authenticatedUser = await UserModel.findOne({'email': authenticatedUserEmail});

        if (!authenticatedUser) {
            throw createHttpError(404, "User not found");
        }

        const authenticatedUserRole = authenticatedUser.role as string;

        if (![UserRoles.Manager as string, UserRoles.Admin as string].includes(authenticatedUserRole)) {
            throw createHttpError(401, "You cannot access the genera data");
        }

        const genera = await GeneraModel.findOne({ _id: id }).populate("creator");

        if (!genera) {
            throw createHttpError(404, "Genera not found");
        }

        res.status(200).json(genera);
    } catch (error) {
        next(error);
    }
};

export const GetGeneraPagination: RequestHandler<unknown, unknown, unknown, GeneraPaginationQueryInterface> = async (req, res, next) => {
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
        const authenticatedUser = await UserModel.findOne({'email': authenticatedUserEmail});

        if (!authenticatedUser) {
            throw createHttpError(404, "User not found");
        }

        const authenticatedUserRole = authenticatedUser.role as string;

        if (![UserRoles.Manager as string, UserRoles.Admin as string].includes(authenticatedUserRole)) {
            throw createHttpError(401, "You cannot access the genera data");
        }

        let query = {};

        if(name_like) {
            query = {...query, name: { $regex: name_like, $options: "i" }}
        }

        const genera = await GeneraModel.find(query)
            .skip(_start)
            .limit(_end)
            .sort({[_sort]: _order});

        const totalCount = await GeneraModel.find(query).countDocuments();

        res.append('X-Total-Count', totalCount.toString());
        res.append('Access-Control-Expose-Headers', 'X-Total-Count');

        res.status(200).json(genera);
    } catch (error) {
        next(error);
    }
}

export const EditGenera: RequestHandler<GeneraParamsInterface, unknown, GeneraBodyInterface, unknown> = async (req, res, next) => {
    const token = req.headers.authorization;
    const { id } = req.params;
    const {
        name
    } = req.body;
    const authenticatedUserEmail = parseJwt(token as string).email;

    try {
        const authenticatedUser = await UserModel.findOne({'email': authenticatedUserEmail});

        if (!authenticatedUser) {
            throw createHttpError(404, "User not found");
        }

        const authenticatedUserRole = authenticatedUser.role as string;

        if (![UserRoles.Manager as string, UserRoles.Admin as string].includes(authenticatedUserRole)) {
            throw createHttpError(401, "You cannot edit this genera");
        }

        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid genera Id");
        }

        const genera = await GeneraModel.findById(id);

        if (!genera) {
            throw createHttpError(404, "Genera not found");
        }

        const generaExists = await GeneraModel.findOne({name, _id : {$ne: genera._id}});

        if (generaExists) {
            throw createHttpError(404, "A genera with that name already exists");
        }

        genera.name = name;

        await genera.save();

        res.status(200).json({ message: "Genera updated successfully" });
    } catch (error) {
        next(error);
    }
}

export const DeleteGenera: RequestHandler<GeneraParamsInterface, unknown, unknown, unknown>  = async (req, res, next) => {
    const token = req.headers.authorization;
    const { id } = req.params;
    const authenticatedUserEmail = parseJwt(token as string).email;

    try {
        const authenticatedUser = await UserModel.findOne({'email': authenticatedUserEmail});

        if (!authenticatedUser) {
            throw createHttpError(404, "User not found");
        }

        const authenticatedUserRole = authenticatedUser.role as string;

        if (![UserRoles.Manager as string, UserRoles.Admin as string].includes(authenticatedUserRole)) {
            throw createHttpError(401, "You cannot delete this genera");
        }

        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid genera id");
        }

        const genera = await GeneraModel.findById(id);

        if (!genera) {
            throw createHttpError(404, "Genera not found");
        }

        await GeneraModel.deleteOne({_id: id});

        res.status(200).json({ message: "Genera deleted successfully" });
    } catch (error) {
        next(error);
    }
}