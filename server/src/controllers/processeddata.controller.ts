import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { UserModel, ProcessedDataModel } from '../models';
import { ProcessedDataBodyInterface, ProcessedDataPaginationQueryInterface, ProcessedDataParamsInterface } from '../data/interfaces/processeddata';
import { CreatorOptions, UserRoles } from '../data/enums/user.enum';
import mongoose from 'mongoose';
import { parseJwt } from '../utils';

export const CreateProcessedData: RequestHandler<unknown, unknown, ProcessedDataBodyInterface, unknown> = async (req, res, next) => {
    const token = req.headers.authorization;
    const {
        actinobacteria,
        massDetection,
        chromatogramBuilder,
        deconvolution,
        isotope,
        filtered,
        identification,
        alignment,
        gapFilling,
        comments
    } = req.body;
    const authenticatedUserEmail = parseJwt(token as string).email;

    try {
        const authenticatedUser = await UserModel.findOne({'email': authenticatedUserEmail});

        if (!authenticatedUser) {
            throw createHttpError(404, "User not found");
        }

        await ProcessedDataModel.create({
            actinobacteria,
            massDetection,
            chromatogramBuilder,
            deconvolution,
            isotope,
            filtered,
            identification,
            alignment,
            gapFilling,
            comments,
            creator: authenticatedUser._id
        }).catch(err => console.log(err))

        res.status(200).json({ message: "Processed data created successfully" });
    } catch (error) {
        next(error);
    }
};

export const GetProcessedDataById: RequestHandler<ProcessedDataParamsInterface, unknown, unknown, unknown> = async (req, res, next) => {
    const token = req.headers.authorization;
    const { id } = req.params;
    const authenticatedUserEmail = parseJwt(token as string).email;

    try {
        const authenticatedUser = await UserModel.findOne({'email': authenticatedUserEmail});

        if (!authenticatedUser) {
            throw createHttpError(404, "User not found");
        }

        const actinobacteria = await ProcessedDataModel.findOne({ _id: id })
            . populate({
                path:'actinobacteria',
                select:'identifierStrain'
            })
            .populate({
                path: 'creator',
                select: 'name email'
            }).exec();

        if (!actinobacteria) {
            throw createHttpError(404, "Processed data not found");
        }

        res.status(200).json(actinobacteria);
    } catch (error) {
        next(error);
    }
};

export const GetProcessedDataPagination: RequestHandler<unknown, unknown, unknown, ProcessedDataPaginationQueryInterface> = async (req, res, next) => {
    const token = req.headers.authorization;
    const {
        _end,
        _order,
        _start,
        _sort,
        massDetection_like = "",
        chromatogramBuilder_like = "",
        deconvolution_like = "",
        isotope_like = "",
        actinobacteria = "",
        person,
    } = req.query;
    const authenticatedUserEmail = parseJwt(token as string).email;

    try {
        const authenticatedUser = await UserModel.findOne({'email': authenticatedUserEmail});

        if (!authenticatedUser) {
            throw createHttpError(404, "User not found");
        }

        let query = {};

        if(massDetection_like) {
            query = {...query, massDetection: { $regex: massDetection_like, $options: "i" }}
        }

        if(chromatogramBuilder_like) {
            query = {...query, chromatogramBuilder: { $regex: chromatogramBuilder_like, $options: "i" }}
        }

        if(deconvolution_like) {
            query = {...query, deconvolution: { $regex: deconvolution_like, $options: "i" }}
        }

        if(isotope_like) {
            query = {...query, isotope: { $regex: isotope_like, $options: "i" }}
        }

        if(actinobacteria) {
            query = {...query, actinobacteria: new mongoose.Types.ObjectId(actinobacteria) }
        }

        if (person) {
            if (person === CreatorOptions.Me) {
                query = {...query, creator: { $eq: authenticatedUser._id } }
            }

            if (person === CreatorOptions.Other) {
                query = {...query, creator: { $ne: authenticatedUser._id } }
            }
        }

        const processeddata = await ProcessedDataModel.find(query)
            .skip(_start)
            .limit(_end)
            .sort({[_sort]: _order})
            .populate({
                path: 'creator',
                select: 'name email'
            }).exec();

        const totalCount = await ProcessedDataModel.find(query).countDocuments();

        res.append('X-Total-Count', totalCount.toString());
        res.append('Access-Control-Expose-Headers', 'X-Total-Count');

        res.status(200).json(processeddata);
    } catch (error) {
        next(error);
    }
}

export const EditProcessedData: RequestHandler<ProcessedDataParamsInterface, unknown, ProcessedDataBodyInterface, unknown> = async (req, res, next) => {
    const token = req.headers.authorization;
    const { id } = req.params;
    const {
        actinobacteria,
        massDetection,
        chromatogramBuilder,
        deconvolution,
        isotope,
        filtered,
        identification,
        alignment,
        gapFilling,
        comments
    } = req.body;
    const authenticatedUserEmail = parseJwt(token as string).email;

    try {
        const authenticatedUser = await UserModel.findOne({'email': authenticatedUserEmail});

        if (!authenticatedUser) {
            throw createHttpError(404, "User not found");
        }

        const authenticatedUserRole = authenticatedUser.role as string;

        if (![UserRoles.Manager as string, UserRoles.Admin as string].includes(authenticatedUserRole)) {
            throw createHttpError(401, "You cannot edit this processed data");
        }

        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid processed data Id");
        }

        const processedData = await ProcessedDataModel.findById(id);

        if (!processedData) {
            throw createHttpError(404, "Processed data not found");
        }

        await ProcessedDataModel.findByIdAndUpdate(
            {
                _id: id
            },
            {
                actinobacteria: actinobacteria,
                massDetection: massDetection,
                chromatogramBuilder: chromatogramBuilder,
                deconvolution: deconvolution,
                isotope: isotope,
                filtered: filtered,
                identification: identification,
                alignment: alignment,
                gapFilling: gapFilling,
                comments: comments,
            }
        );

        res.status(200).json({ message: "Processed data updated successfully" });
    } catch (error) {
        next(error);
    }
}

export const DeleteProcessedData: RequestHandler<ProcessedDataParamsInterface, unknown, unknown, unknown>  = async (req, res, next) => {
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
            throw createHttpError(401, "You cannot delete this processed data");
        }

        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid processed data id");
        }

        const processedData = await ProcessedDataModel.findById(id);

        if (!processedData) {
            throw createHttpError(404, "Processed data not found");
        }

        await ProcessedDataModel.deleteOne({_id: id});

        res.status(200).json({ message: "Processed data deleted successfully" });
    } catch (error) {
        next(error);
    }
}