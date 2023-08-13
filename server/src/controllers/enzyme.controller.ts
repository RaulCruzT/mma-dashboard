import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { UserModel, EnzymeModel } from '../models';
import { EnzymeParamsInterface, EnzymeBodyInterface, EnzymePaginationQueryInterface } from '../data/interfaces/enzyme';
import { UserRoles } from '../data/enums/user.enum';
import mongoose from 'mongoose';
import { parseJwt } from '../utils';

export const CreateEnzyme: RequestHandler<unknown, unknown, EnzymeBodyInterface, unknown> = async (req, res, next) => {
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
            throw createHttpError(401, "You cannot create a enzyme");
        }

        const enzymeExists = await EnzymeModel.findOne({ name });

        if (enzymeExists) {
            throw createHttpError(404, "A enzyme with that name already exists");
        }

        const newEnzyme = await EnzymeModel.create({
            name,
        });

        res.status(200).json(newEnzyme);
    } catch (error) {
        next(error);
    }
};

export const GetEnzymeById: RequestHandler<EnzymeParamsInterface, unknown, unknown, unknown> = async (req, res, next) => {
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
            throw createHttpError(401, "You cannot access the enzyme data");
        }

        const enzyme = await EnzymeModel.findOne({ _id: id });

        if (!enzyme) {
            throw createHttpError(404, "Enzyme not found");
        }

        res.status(200).json(enzyme);
    } catch (error) {
        next(error);
    }
};

export const GetEnzymePagination: RequestHandler<unknown, unknown, unknown, EnzymePaginationQueryInterface> = async (req, res, next) => {
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
            throw createHttpError(401, "You cannot access the enzyme data");
        }

        let enzyme;

        let query = {};

        if(name_like) {
            query = {...query, name: { $regex: name_like}}
        }

        if (_order && _sort) {
            enzyme = await EnzymeModel.find(query)
            .limit(_end)
            .skip(_start)
            .sort({[_sort]: _order})
            .exec();
        } else{
            enzyme = await EnzymeModel.find(query)
            .limit(_end)
            .skip(_start)
            .exec();
        }

        const totalCount = await EnzymeModel.find(query).countDocuments();

        res.append('X-Total-Count', totalCount.toString());
        res.append('Access-Control-Expose-Headers', 'X-Total-Count');

        res.status(200).json(enzyme);
    } catch (error) {
        next(error);
    }
}

export const EditEnzyme: RequestHandler<EnzymeParamsInterface, unknown, EnzymeBodyInterface, unknown> = async (req, res, next) => {
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
            throw createHttpError(401, "You cannot edit this enzyme");
        }

        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid enzyme Id");
        }

        const enzyme = await EnzymeModel.findById(id).exec();

        if (!enzyme) {
            throw createHttpError(404, "Enzyme not found");
        }

        if (name !== undefined) {
            const enzymeExists = await EnzymeModel.findOne({name, _id : {$ne: enzyme._id}});

            if (enzymeExists && enzymeExists._id !== enzymeExists._id) {
                throw createHttpError(404, "A enzyme with that name already exists");
            }

            enzyme.name = name;
        }

        const updatedEnzyme = await enzyme.save();

        res.status(200).json(updatedEnzyme);
    } catch (error) {
        next(error);
    }
}

export const DeleteEnzyme: RequestHandler<EnzymeParamsInterface, unknown, unknown, unknown>  = async (req, res, next) => {
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
            throw createHttpError(401, "You cannot delete this enzyme");
        }

        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid enzyme id");
        }

        const enzyme = await EnzymeModel.findById(id).exec();

        if (!enzyme) {
            throw createHttpError(404, "Enzyme not found");
        }

        await EnzymeModel.deleteOne({_id: id});

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}