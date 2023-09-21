import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { UserModel, AssemblyModel } from '../models';
import { AssemblyPaginationQueryInterface, AssemblyParamsInterface } from '../data/interfaces/assembly';
import { parseJwt } from '../utils';

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
            .sort({[_sort]: _order});

        const totalCount = await AssemblyModel.find(query).countDocuments();

        res.append('X-Total-Count', totalCount.toString());
        res.append('Access-Control-Expose-Headers', 'X-Total-Count');

        res.status(200).json(assembly);
    } catch (error) {
        next(error);
    }
}