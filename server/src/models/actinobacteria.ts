import { InferSchemaType, model, Schema } from "mongoose";
import getFloat from "../utils/getFloat";

const actinobacteriaSchema = new Schema({
    creator: { type: Schema.Types.ObjectId, required: true, ref: "User", select: false },
    identifierStrain: { type: String, required: true, unique: true },
    identifierGenera: { type: Schema.Types.ObjectId, ref: "Genera", required: true},
    identifierSpecies: { type: String },
    identifierMainPhoto: { type: String, required: true, match: [/^(http|https):\/\/[^ "]+$/, 'Please enter a valid URL.'] },
    identifierPhotos: { type: String, match: [/^(http|https):\/\/[^ "]+$/, 'Please enter a valid URL.'] },
    identifierLocalStorage: { type: String, required: true },
    identifierInternationalStorage: { type: String },
    identifierComments: { type: String },
    geographyIsolationSite: { type: String, required: true },
    geographyCoordinates: { type: String },
    geographyIsolationSource: { type: String, required: true },
    geographyAltitude: { type: Schema.Types.Decimal128, get: getFloat },
    geographyComments: { type: String },
    isolationMedium: { type: String, required: true },
    isolationTemperature: { type: Schema.Types.Decimal128, get: getFloat, required: true },
    isolationMethod: { type: String, required: true },
    isolationResponsible: { type: String, required: true },
    isolationThesisPaper: { type: String },
    isolationThesisPaperLink: { type: String, match: [/^(http|https):\/\/[^ "]+$/, 'Please enter a valid URL.'] },
    isolationComments: { type: String },
    arnr16sCompleteness: { type: String, required: true },
    arnr16sSize: { type: Schema.Types.Decimal128, get: getFloat, required: true },
    arnr16sSequenceFile: { type: String, required: true, match: [/^(http|https):\/\/[^ "]+$/, 'Please enter a valid URL.'] },
    arnr16sMacrogenFile: { type: String, match: [/^(http|https):\/\/[^ "]+$/, 'Please enter a valid URL.'] },
    arnr16sComments: { type: String },
    characterizationGrowingMedia: [{ type: Schema.Types.ObjectId, ref: "CultureMedium" }],
    characterizationNotGrowingMedia: [{ type: Schema.Types.ObjectId, ref: "CultureMedium" }],
    characterizationMycelial: { type: String, required: true },
    characterizationColoniesDay: { type: Number, min: 0 },
    characterizationSporulationDay: { type: Number, min: 0 },
    characterizationBiomassDay: { type: Number, min: 0 },
    characterizationShape: { type: String },
    characterizationBorder: { type: String },
    characterizationElevation: { type: String },
    characterizationSurface: { type: String },
    characterizationColor: { type: String },
    characterizationTransparency: { type: String },
    characterizationBrightness: { type: String },
    characterizationComments: { type: String },
    genomeRawData: { type: String, match: [/^(http|https):\/\/[^ "]+$/, 'Please enter a valid URL.'] },
    genomeComments: { type: String },
    bioactivityFile: { type: String, match: [/^(http|https):\/\/[^ "]+$/, 'Please enter a valid URL.'] },
    bioactivityYes: [{ type: Schema.Types.ObjectId, ref: "TypeStrain" }],
    bioactivityNo: [{ type: Schema.Types.ObjectId, ref: "TypeStrain" }],
    bioactivityNa: [{ type: Schema.Types.ObjectId, ref: "TypeStrain" }],
    bioactivityComments: { type: String },
    metabolomicsMedinaFoundationReports: { type: String, match: [/^(http|https):\/\/[^ "]+$/, 'Please enter a valid URL.'] },
    metabolomicsRawData: { type: String, match: [/^(http|https):\/\/[^ "]+$/, 'Please enter a valid URL.'] },
    metabolomicsComments: { type: String },
    enzymesYes: [{ type: Schema.Types.ObjectId, ref: "Enzyme" }],
    enzymesNo: [{ type: Schema.Types.ObjectId, ref: "Enzyme" }],
    enzymesNa: [{ type: Schema.Types.ObjectId, ref: "Enzyme" }],
    enzymesComments: { type: String },
}, { timestamps: true, toJSON: {getters: true}});

type Actinobacteria = InferSchemaType<typeof actinobacteriaSchema>;

export default model<Actinobacteria>("Actinobacteria", actinobacteriaSchema);