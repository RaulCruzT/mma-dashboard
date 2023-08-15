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
        const authenticatedUser = await UserModel.findOne({'email': authenticatedUserEmail}).exec();

        if (!authenticatedUser) {
            throw createHttpError(404, "User not found");
        }

        const actinobacteria = await ActinobacteriaModel.findOne({ _id: id });

        if (!actinobacteria) {
            throw createHttpError(404, "Actinobacteria not found");
        }

        res.status(200).json(actinobacteria);
    } catch (error) {
        next(error);
    }
};

export const GetActinobacteriaPagination: RequestHandler<unknown, unknown, unknown, ActinobacteriaPaginationQueryInterface> = async (req, res, next) => {
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

        let actinobacteria;

        let query = {};

        if(name_like) {
            query = {...query, name: { $regex: name_like}}
        }

        if (_order && _sort) {
            actinobacteria = await ActinobacteriaModel.find(query)
            .skip(_start)
            .limit(_end)
            .sort({[_sort]: _order})
            .exec();
        } else{
            actinobacteria = await ActinobacteriaModel.find(query)
            .skip(_start)
            .limit(_end)
            .exec();
        }

        const totalCount = await ActinobacteriaModel.find(query).countDocuments().exec();

        res.append('X-Total-Count', totalCount.toString());
        res.append('Access-Control-Expose-Headers', 'X-Total-Count');

        res.status(200).json(actinobacteria);
    } catch (error) {
        next(error);
    }
}