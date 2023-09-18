import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { UserModel, ActinobacteriaModel } from '../models';
import { ActinobacteriaParamsInterface, ActinobacteriaPaginationQueryInterface } from '../data/interfaces/actinobacteria';
import { parseJwt } from '../utils';

export const GetActinobacteriaById: RequestHandler<ActinobacteriaParamsInterface, unknown, unknown, unknown> = async (req, res, next) => {
    const token = req.headers.authorization;
    const { id } = req.params;
    const authenticatedUserEmail = parseJwt(token as string).email;

    try {
        const authenticatedUser = await UserModel.findOne({'email': authenticatedUserEmail});

        if (!authenticatedUser) {
            throw createHttpError(404, "User not found");
        }

        const actinobacteria = await ActinobacteriaModel.findOne({ _id: id })
            . populate({
                path:'identifierGenera',
                select:'name'
            })
            .populate({
                path: 'characterizationGrowingMedia',
                select: 'name'
            })
            .populate({
                path: 'characterizationNotGrowingMedia',
                select: 'name'
            })
            .populate({
                path: 'bioactivityYes',
                select: 'name'
            })
            .populate({
                path: 'bioactivityNo',
                select: 'name'
            })
            .populate({
                path: 'bioactivityNa',
                select: 'name'
            })
            .populate({
                path: 'enzymesYes',
                select: 'name'
            })
            .populate({
                path: 'enzymesNo',
                select: 'name'
            })
            .populate({
                path: 'enzymesNa',
                select: 'name'
            })
            .populate({
                path: 'creator',
                select: 'name email'
            }).exec();

        if (!actinobacteria) {
            throw createHttpError(404, "Actinobacteria not found");
        }

        res.status(200).json(actinobacteria);
    } catch (error) {
        next(error);
    }
};

export const GetActinobacteriaPagination: RequestHandler<unknown, unknown, unknown, ActinobacteriaPaginationQueryInterface> = async (req, res, next) => {
    const token = req.headers.authorization;
    const {
        _end,
        _order,
        _start,
        _sort,
        identifierStrain_like = "",
        identifierSpecies_like = "",
        arnr16sCompleteness_like = ""
    } = req.query;
    const authenticatedUserEmail = parseJwt(token as string).email;

    try {
        const authenticatedUser = await UserModel.findOne({'email': authenticatedUserEmail});

        if (!authenticatedUser) {
            throw createHttpError(404, "User not found");
        }

        let query = {};

        if(identifierStrain_like) {
            query = {...query, identifierStrain: { $regex: identifierStrain_like, $options: "i" }}
        }

        if(identifierSpecies_like) {
            query = {...query, identifierSpecies: { $regex: identifierSpecies_like, $options: "i" }}
        }

        if(arnr16sCompleteness_like) {
            query = {...query, arnr16sCompleteness: { $regex: arnr16sCompleteness_like, $options: "i" }}
        }

        const actinobacteria = await ActinobacteriaModel.find(query)
            .skip(_start)
            .limit(_end)
            .sort({[_sort]: _order})
            .populate("identifierGenera");

        const totalCount = await ActinobacteriaModel.find(query).countDocuments();

        res.append('X-Total-Count', totalCount.toString());
        res.append('Access-Control-Expose-Headers', 'X-Total-Count');

        res.status(200).json(actinobacteria);
    } catch (error) {
        next(error);
    }
}