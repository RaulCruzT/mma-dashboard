import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { UserModel, AssemblyModel } from '../models';
import { AssemblyBodyInterface, AssemblyPaginationQueryInterface, AssemblyParamsInterface } from '../data/interfaces/assembly';
import { UserRoles } from '../data/enums/user.enum';
import mongoose from 'mongoose';
import { parseJwt } from '../utils';

export const CreateAssembly: RequestHandler<unknown, unknown, AssemblyBodyInterface, unknown> = async (req, res, next) => {
    const token = req.headers.authorization;
    const {
        actinobacteria,
        date,
        bgcs,
        softwareTrimming,
        softwareAssembly,
        parametersAssembly,
        qualityFinal,
        comments,
        link
    } = req.body;
    const authenticatedUserEmail = parseJwt(token as string).email;

    try {
        const authenticatedUser = await UserModel.findOne({'email': authenticatedUserEmail});

        if (!authenticatedUser) {
            throw createHttpError(404, "User not found");
        }

        const assemblyExists = await AssemblyModel.findOne({ name });

        if (assemblyExists) {
            throw createHttpError(404, "An assembly with that name already exists");
        }

        await AssemblyModel.create({
            actinobacteria,
            date,
            bgcs,
            softwareTrimming,
            softwareAssembly,
            parametersAssembly,
            qualityFinal,
            comments,
            link,
            creator: authenticatedUser._id
        });

        res.status(200).json({ message: "Assembly created successfully" });
    } catch (error) {
        next(error);
    }
};

export const GetAssemblyById: RequestHandler<AssemblyParamsInterface, unknown, unknown, unknown> = async (req, res, next) => {
    const token = req.headers.authorization;
    const { id } = req.params;
    const authenticatedUserEmail = parseJwt(token as string).email;

    try {
        const authenticatedUser = await UserModel.findOne({'email': authenticatedUserEmail});

        if (!authenticatedUser) {
            throw createHttpError(404, "User not found");
        }

        const actinobacteria = await AssemblyModel.findOne({ _id: id })
            . populate({
                path:'actinobacteria',
                select:'identifierStrain'
            })
            .populate({
                path: 'creator',
                select: 'name email'
            }).exec();

        if (!actinobacteria) {
            throw createHttpError(404, "Assembly not found");
        }

        res.status(200).json(actinobacteria);
    } catch (error) {
        next(error);
    }
};

export const GetAssemblyPagination: RequestHandler<unknown, unknown, unknown, AssemblyPaginationQueryInterface> = async (req, res, next) => {
    const token = req.headers.authorization;
    const {
        _end,
        _order,
        _start,
        _sort,
        softwareTrimming_like = "",
        softwareAssembly_like = "",
        parametersAssembly_like = ""
    } = req.query;
    const authenticatedUserEmail = parseJwt(token as string).email;

    try {
        const authenticatedUser = await UserModel.findOne({'email': authenticatedUserEmail});

        if (!authenticatedUser) {
            throw createHttpError(404, "User not found");
        }

        let query = {};

        if(softwareTrimming_like) {
            query = {...query, softwareTrimming: { $regex: softwareTrimming_like, $options: "i" }}
        }

        if(softwareAssembly_like) {
            query = {...query, softwareAssembly: { $regex: softwareAssembly_like, $options: "i" }}
        }

        if(parametersAssembly_like) {
            query = {...query, parametersAssembly: { $regex: parametersAssembly_like, $options: "i" }}
        }

        const assembly = await AssemblyModel.find(query)
            .skip(_start)
            .limit(_end)
            .sort({[_sort]: _order})
            .populate({
                path: 'creator',
                select: 'name email'
            }).exec();

        const totalCount = await AssemblyModel.find(query).countDocuments();

        res.append('X-Total-Count', totalCount.toString());
        res.append('Access-Control-Expose-Headers', 'X-Total-Count');

        res.status(200).json(assembly);
    } catch (error) {
        next(error);
    }
}

export const EditAssembly: RequestHandler<AssemblyParamsInterface, unknown, AssemblyBodyInterface, unknown> = async (req, res, next) => {
    const token = req.headers.authorization;
    const { id } = req.params;
    const {
        actinobacteria,
        date,
        bgcs,
        softwareTrimming,
        softwareAssembly,
        parametersAssembly,
        qualityFinal,
        comments,
        link
    } = req.body;
    const authenticatedUserEmail = parseJwt(token as string).email;

    try {
        const authenticatedUser = await UserModel.findOne({'email': authenticatedUserEmail});

        if (!authenticatedUser) {
            throw createHttpError(404, "User not found");
        }

        const authenticatedUserRole = authenticatedUser.role as string;

        if (![UserRoles.Manager as string, UserRoles.Admin as string].includes(authenticatedUserRole)) {
            throw createHttpError(401, "You cannot edit this assembly");
        }

        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid assembly Id");
        }

        const assembly = await AssemblyModel.findById(id);

        if (!assembly) {
            throw createHttpError(404, "Assembly not found");
        }

        const assemblyExists = await AssemblyModel.findOne({name, _id : {$ne: assembly._id}});

        if (assemblyExists) {
            throw createHttpError(404, "An assembly with that name already exists");
        }

        await AssemblyModel.findByIdAndUpdate(
            {
                _id: id
            },
            {
                actinobacteria: actinobacteria,
                date: date,
                bgcs: bgcs,
                softwareTrimming: softwareTrimming,
                softwareAssembly: softwareAssembly,
                parametersAssembly: parametersAssembly,
                qualityFinal: qualityFinal,
                comments: comments,
                link: link
            }
        );

        res.status(200).json({ message: "Assembly updated successfully" });
    } catch (error) {
        next(error);
    }
}

export const DeleteAssembly: RequestHandler<AssemblyParamsInterface, unknown, unknown, unknown>  = async (req, res, next) => {
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
            throw createHttpError(401, "You cannot delete this assembly");
        }

        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid assembly id");
        }

        const assembly = await AssemblyModel.findById(id);

        if (!assembly) {
            throw createHttpError(404, "Assembly not found");
        }

        await AssemblyModel.deleteOne({_id: id});

        res.status(200).json({ message: "Assembly deleted successfully" });
    } catch (error) {
        next(error);
    }
}