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

        const actinobacteria = await ActinobacteriaModel.findOne({ _id: id }).populate("identifierGenera", "creator").exec();

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

        actinobacteria.identifierStrain = identifierStrain;
        actinobacteria.identifierSpecies = identifierSpecies;
        actinobacteria.identifierMainPhoto = identifierMainPhoto;
        actinobacteria.identifierPhotos = identifierPhotos;
        actinobacteria.identifierLocalStorage = identifierLocalStorage;
        actinobacteria.identifierInternationalStorage = identifierInternationalStorage;
        actinobacteria.identifierComments = identifierComments;
        actinobacteria.geographyIsolationSite = geographyIsolationSite;
        actinobacteria.geographyCoordinates = geographyCoordinates;
        actinobacteria.geographyIsolationSource = geographyIsolationSource;
        // actinobacteria.geographyAltitude = new mongoose.Types.Decimal128(geographyAltitude.toString());
        actinobacteria.geographyComments = geographyComments;
        actinobacteria.isolationMedium = isolationMedium;
        // actinobacteria.isolationTemperature = new mongoose.Types.Decimal128(isolationTemperature.toString());
        actinobacteria.isolationMethod = isolationMethod;
        actinobacteria.isolationResponsible = isolationResponsible;
        actinobacteria.isolationThesisPaper = isolationThesisPaper;
        actinobacteria.isolationThesisPaperLink = isolationThesisPaperLink;
        actinobacteria.isolationComments = isolationComments;
        // actinobacteria.arnr16sSize = new mongoose.Types.Decimal128(arnr16sSize.toString());
        actinobacteria.arnr16sSequenceFile = arnr16sSequenceFile;
        actinobacteria.arnr16sMacrogenFile = arnr16sMacrogenFile;
        actinobacteria.arnr16sComments = arnr16sComments;
        actinobacteria.enzymesComments = enzymesComments;
        actinobacteria.genomeRawData = genomeRawData;
        actinobacteria.genomeComments = genomeComments;
        actinobacteria.bioactivityFile = bioactivityFile;
        actinobacteria.bioactivityComments = bioactivityComments;
        actinobacteria.metabolomicsMedinaFoundationReports = metabolomicsMedinaFoundationReports;
        actinobacteria.metabolomicsRawData = metabolomicsRawData;
        actinobacteria.metabolomicsComments = metabolomicsComments;
        // actinobacteria.identifierGenera = new mongoose.Types.ObjectId(identifierGenera);
        actinobacteria.arnr16sCompleteness = arnr16sCompleteness;
        // actinobacteria.characterizationGrowingMedia = characterizationGrowingMedia.map(x => (new mongoose.Types.ObjectId(x)));
        // actinobacteria.characterizationNotGrowingMedia = characterizationNotGrowingMedia.map(x => (new mongoose.Types.ObjectId(x)));
        // actinobacteria.enzymesNa = enzymesNa.map(x => (new mongoose.Types.ObjectId(x)));
        // actinobacteria.bioactivityYes = bioactivityYes.map(x => (new mongoose.Types.ObjectId(x)));
        // actinobacteria.bioactivityNo = bioactivityNo.map(x => (new mongoose.Types.ObjectId(x)));
        // actinobacteria.bioactivityNa = bioactivityNa.map(x => (new mongoose.Types.ObjectId(x)));
        // actinobacteria.enzymesYes = enzymesYes.map(x => (new mongoose.Types.ObjectId(x)));
        // actinobacteria.enzymesNo = enzymesNo.map(x => (new mongoose.Types.ObjectId(x)));
        actinobacteria.characterizationMycelial = characterizationMycelial;
        actinobacteria.characterizationColoniesDay = characterizationColoniesDay;
        actinobacteria.characterizationSporulationDay = characterizationSporulationDay;
        actinobacteria.characterizationBiomassDay = characterizationBiomassDay;
        actinobacteria.characterizationShape = characterizationShape;
        actinobacteria.characterizationBorder = characterizationBorder;
        actinobacteria.characterizationElevation = characterizationElevation;
        actinobacteria.characterizationSurface = characterizationSurface;
        actinobacteria.characterizationColor = characterizationColor;
        actinobacteria.characterizationTransparency = characterizationTransparency;
        actinobacteria.characterizationBrightness = characterizationBrightness;
        actinobacteria.characterizationComments = characterizationComments;
        
        console.log(JSON.stringify(actinobacteria));

        await actinobacteria.save();

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