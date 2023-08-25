import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { UserModel, ActinobacteriaModel } from '../models';
import { ActinobacteriaParamsInterface, ActinobacteriaPaginationQueryInterface, ActinobacteriaBodyInterface } from '../data/interfaces/actinobacteria';
import { parseJwt } from '../utils';
import { UserRoles } from '../data/enums/user.enum';

export const CreateMyActinobacteria: RequestHandler<unknown, unknown, ActinobacteriaBodyInterface, unknown> = async (req, res, next) => {
    const token = req.headers.authorization;
    const {
        identifierStrain,
        identifierSpecies,
        identifierMainPhoto,
        identifierPhotos,
        identifierLocalStorage,
        identifierInternationalStorage,
        identifierComments,
        geographyIsolationSite,
        geographyCoordinates,
        geographyIsolationSource,
        geographyAltitude,
        geographyComments,
        isolationMedium,
        isolationTemperature,
        isolationMethod,
        isolationResponsible,
        isolationThesisPaper,
        isolationThesisPaperLink,
        isolationComments,
        arnr16sSize,
        arnr16sSequenceFile,
        arnr16sMacrogenFile,
        arnr16sComments,
        enzymesComments,
        genomeRawData,
        genomeComments,
        bioactivityFile,
        bioactivityComments,
        metabolomicsMedinaFoundationReports,
        metabolomicsRawData,
        metabolomicsComments,
        identifierGenera,
        arnr16sCompleteness,
        characterizationGrowingMedia,
        characterizationNotGrowingMedia,
        enzymesNa,
        bioactivityYes,
        bioactivityNo,
        bioactivityNa,
        enzymesYes,
        enzymesNo,
        characterizationMycelial,
        characterizationColoniesDay,
        characterizationSporulationDay,
        characterizationBiomassDay,
        characterizationShape,
        characterizationBorder,
        characterizationElevation,
        characterizationSurface,
        characterizationColor,
        characterizationTransparency,
        characterizationBrightness,
        characterizationComments
    } = req.body;
    const authenticatedUserEmail = parseJwt(token as string).email;

    try {
        const authenticatedUser = await UserModel.findOne({'email': authenticatedUserEmail});

        if (!authenticatedUser) {
            throw createHttpError(404, "User not found");
        }

        const generaExists = await ActinobacteriaModel.findOne({ identifierStrain });

        if (generaExists) {
            throw createHttpError(404, "An actinobacteria with that strain already exists");
        }

        await ActinobacteriaModel.create({
            identifierStrain,
            identifierSpecies,
            identifierMainPhoto,
            identifierPhotos,
            identifierLocalStorage,
            identifierInternationalStorage,
            identifierComments,
            geographyIsolationSite,
            geographyCoordinates,
            geographyIsolationSource,
            geographyAltitude,
            geographyComments,
            isolationMedium,
            isolationTemperature,
            isolationMethod,
            isolationResponsible,
            isolationThesisPaper,
            isolationThesisPaperLink,
            isolationComments,
            arnr16sSize,
            arnr16sSequenceFile,
            arnr16sMacrogenFile,
            arnr16sComments,
            enzymesComments,
            genomeRawData,
            genomeComments,
            bioactivityFile,
            bioactivityComments,
            metabolomicsMedinaFoundationReports,
            metabolomicsRawData,
            metabolomicsComments,
            identifierGenera,
            arnr16sCompleteness,
            characterizationGrowingMedia,
            characterizationNotGrowingMedia,
            enzymesNa,
            bioactivityYes,
            bioactivityNo,
            bioactivityNa,
            enzymesYes,
            enzymesNo,
            characterizationMycelial,
            characterizationColoniesDay,
            characterizationSporulationDay,
            characterizationBiomassDay,
            characterizationShape,
            characterizationBorder,
            characterizationElevation,
            characterizationSurface,
            characterizationColor,
            characterizationTransparency,
            characterizationBrightness,
            characterizationComments,
            creator: authenticatedUser._id
        });

        res.status(200).json({ message: "Actinobacteria created successfully" });
    } catch (error) {
        next(error);
    }
};

export const GetMyActinobacteriaById: RequestHandler<ActinobacteriaParamsInterface, unknown, unknown, unknown> = async (req, res, next) => {
    const token = req.headers.authorization;
    const { id } = req.params;
    const authenticatedUserEmail = parseJwt(token as string).email;

    try {
        const authenticatedUser = await UserModel.findOne({'email': authenticatedUserEmail});

        if (!authenticatedUser) {
            throw createHttpError(404, "User not found");
        }

        const authenticatedUserRole = authenticatedUser.role as string;

        const actinobacteria = await ActinobacteriaModel.findOne({ _id: id }).populate("creator");

        if (!actinobacteria) {
            throw createHttpError(404, "Actinobacteria not found");
        }

        if (![UserRoles.Manager as string, UserRoles.Admin as string].includes(authenticatedUserRole) && actinobacteria.creator._id !== authenticatedUser._id) {
            throw createHttpError(401, "You cannot access the actinobacteria data");
        }

        res.status(200).json(actinobacteria);
    } catch (error) {
        next(error);
    }
};

export const GetMyActinobacteriaPagination: RequestHandler<unknown, unknown, unknown, ActinobacteriaPaginationQueryInterface> = async (req, res, next) => {
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

        let query = {};

        if(name_like) {
            query = {...query, name: { $regex: name_like, $options: "i" }}
        }

        if (![UserRoles.Manager as string, UserRoles.Admin as string].includes(authenticatedUserRole)) {
            query = {...query, creator: authenticatedUser._id }
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