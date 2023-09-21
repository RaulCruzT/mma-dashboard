import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { UserModel, ProcessedDataModel } from '../models';
import { ProcessedDataPaginationQueryInterface, ProcessedDataParamsInterface } from '../data/interfaces/processeddata';
import { parseJwt } from '../utils';

export const GetAssemblyById: RequestHandler<ProcessedDataParamsInterface, unknown, unknown, unknown> = async (req, res, next) => {
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

export const GetAssemblyPagination: RequestHandler<unknown, unknown, unknown, ProcessedDataPaginationQueryInterface> = async (req, res, next) => {
    const token = req.headers.authorization;
    const {
        _end,
        _order,
        _start,
        _sort,
        massDetection_like = "",
        chromatogramBuilder_like = "",
        deconvolution_like = "",
        isotope_like = ""
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

        const processeddata = await ProcessedDataModel.find(query)
            .skip(_start)
            .limit(_end)
            .sort({[_sort]: _order});

        const totalCount = await ProcessedDataModel.find(query).countDocuments();

        res.append('X-Total-Count', totalCount.toString());
        res.append('Access-Control-Expose-Headers', 'X-Total-Count');

        res.status(200).json(processeddata);
    } catch (error) {
        next(error);
    }
}