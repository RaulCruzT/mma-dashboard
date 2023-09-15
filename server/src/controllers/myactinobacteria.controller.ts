import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { UserModel, ActinobacteriaModel } from '../models';
import { ActinobacteriaParamsInterface, ActinobacteriaPaginationQueryInterface, ActinobacteriaBodyInterface } from '../data/interfaces/actinobacteria';
import { parseJwt } from '../utils';
import { UserRoles } from '../data/enums/user.enum';
import mongoose from 'mongoose';

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

        const actinobacteriaExists = await ActinobacteriaModel.findOne({ identifierStrain });

        if (actinobacteriaExists) {
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
            }).exec();

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

export const EditMyActinobacteria: RequestHandler<ActinobacteriaParamsInterface, unknown, ActinobacteriaBodyInterface, unknown> = async (req, res, next) => {
    const token = req.headers.authorization;
    const { id } = req.params;
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

        const authenticatedUserRole = authenticatedUser.role as string;

        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid actinobacteria id");
        }

        const actinobacteria = await ActinobacteriaModel.findById(id);

        if (!actinobacteria) {
            throw createHttpError(404, "Actinobacteria not found");
        }

        if (![UserRoles.Manager as string, UserRoles.Admin as string].includes(authenticatedUserRole) && authenticatedUser._id !== actinobacteria.creator) {
            throw createHttpError(401, "You cannot update this actinobacteria");
        }

        await ActinobacteriaModel.findByIdAndUpdate(
            {
                _id: id
            },
            {
                identifierStrain: identifierStrain,
                identifierSpecies: identifierSpecies,
                identifierMainPhoto: identifierMainPhoto,
                identifierPhotos: identifierPhotos,
                identifierLocalStorage: identifierLocalStorage,
                identifierInternationalStorage: identifierInternationalStorage,
                identifierComments: identifierComments,
                geographyIsolationSite: geographyIsolationSite,
                geographyCoordinates: geographyCoordinates,
                geographyIsolationSource: geographyIsolationSource,
                geographyAltitude: geographyAltitude,
                geographyComments: geographyComments,
                isolationMedium: isolationMedium,
                isolationTemperature: isolationTemperature,
                isolationMethod: isolationMethod,
                isolationResponsible: isolationResponsible,
                isolationThesisPaper: isolationThesisPaper,
                isolationThesisPaperLink: isolationThesisPaperLink,
                isolationComments: isolationComments,
                arnr16sSize: arnr16sSize,
                arnr16sSequenceFile: arnr16sSequenceFile,
                arnr16sMacrogenFile: arnr16sMacrogenFile,
                arnr16sComments: arnr16sComments,
                enzymesComments: enzymesComments,
                genomeRawData: genomeRawData,
                genomeComments: genomeComments,
                bioactivityFile: bioactivityFile,
                bioactivityComments: bioactivityComments,
                metabolomicsMedinaFoundationReports: metabolomicsMedinaFoundationReports,
                metabolomicsRawData: metabolomicsRawData,
                metabolomicsComments: metabolomicsComments,
                identifierGenera: identifierGenera,
                arnr16sCompleteness: arnr16sCompleteness,
                characterizationGrowingMedia: characterizationGrowingMedia,
                characterizationNotGrowingMedia: characterizationNotGrowingMedia,
                enzymesNa: enzymesNa,
                bioactivityYes: bioactivityYes,
                bioactivityNo: bioactivityNo,
                bioactivityNa: bioactivityNa,
                enzymesYes: enzymesYes,
                enzymesNo: enzymesNo,
                characterizationMycelial: characterizationMycelial,
                characterizationColoniesDay: characterizationColoniesDay,
                characterizationSporulationDay: characterizationSporulationDay,
                characterizationBiomassDay: characterizationBiomassDay,
                characterizationShape: characterizationShape,
                characterizationBorder: characterizationBorder,
                characterizationElevation: characterizationElevation,
                characterizationSurface: characterizationSurface,
                characterizationColor: characterizationColor,
                characterizationTransparency: characterizationTransparency,
                characterizationBrightness: characterizationBrightness,
                characterizationComments: characterizationComments,                
            }
        );

        res.status(200).json({ message: "Actinobacteria updated successfully" });
    } catch (error) {
        next(error);
    }
}

export const DeleteMyActinobacteria: RequestHandler<ActinobacteriaParamsInterface, unknown, unknown, unknown>  = async (req, res, next) => {
    const token = req.headers.authorization;
    const { id } = req.params;
    const authenticatedUserEmail = parseJwt(token as string).email;

    try {
        const authenticatedUser = await UserModel.findOne({'email': authenticatedUserEmail});

        if (!authenticatedUser) {
            throw createHttpError(404, "User not found");
        }

        const authenticatedUserRole = authenticatedUser.role as string;

        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid actinobacteria id");
        }

        const actinobacteria = await ActinobacteriaModel.findById(id);

        if (!actinobacteria) {
            throw createHttpError(404, "Actinobacteria not found");
        }

        if (![UserRoles.Manager as string, UserRoles.Admin as string].includes(authenticatedUserRole) && authenticatedUser._id !== actinobacteria.creator) {
            throw createHttpError(401, "You cannot delete this actinobacteria");
        }

        await ActinobacteriaModel.deleteOne({_id: id});

        res.status(200).json({ message: "Actinobacteria deleted successfully" });
    } catch (error) {
        next(error);
    }
}

