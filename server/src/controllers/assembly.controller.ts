import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { UserModel, AssemblyModel } from '../models';
import { AssemblyPaginationQueryInterface } from '../data/interfaces/assembly';
import { parseJwt } from '../utils';

export const GetAssemblyPagination: RequestHandler<unknown, unknown, unknown, AssemblyPaginationQueryInterface> = async (req, res, next) => {
    const token = req.headers.authorization;
    const {
        _end,
        _order,
        _start,
        _sort
    } = req.query;
    const authenticatedUserEmail = parseJwt(token as string).email;

    try {
        const authenticatedUser = await UserModel.findOne({'email': authenticatedUserEmail});

        if (!authenticatedUser) {
            throw createHttpError(404, "User not found");
        }

        const assembly = await AssemblyModel.find()
            .skip(_start)
            .limit(_end)
            .sort({[_sort]: _order});

        const totalCount = await AssemblyModel.find().countDocuments();

        res.append('X-Total-Count', totalCount.toString());
        res.append('Access-Control-Expose-Headers', 'X-Total-Count');

        res.status(200).json(assembly);
    } catch (error) {
        next(error);
    }
}