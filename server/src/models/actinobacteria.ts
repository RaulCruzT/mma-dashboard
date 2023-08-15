import { InferSchemaType, model, Schema } from "mongoose";

const URL = [/^(http|https):\/\/[^ "]+$/, 'Please enter a valid URL.'];

const actinobacteriaSchema = new Schema({
    creator: { type: Schema.Types.ObjectId, ref: "User", select: false },
    identifier: {
        strain: { type: String, required: true, unique: true },
        genera: { type: String, required: true },
        species: { type: String },
        mainPhoto: { type: String, required: true, match: URL },
        photos: { type: String, match: URL },
        localStorage: { type: String, required: true },
        internationalStorage: { type: String },
        comments: { type: String },
    },
    geography: {
        isolationSite: { type: String, required: true },
        coordinates: { type: String },
        isolationSource: { type: String, required: true },
        altitude: { type: Schema.Types.Decimal128 },
        comments: { type: String },
    },
    isolation: {
        medium: { type: String, required: true },
        temperature: { type: Schema.Types.Decimal128, required: true },
        method: { type: String, required: true },
        responsible: { type: String, required: true },
        thesisPaper: { type: String },
        thesisPaperLink: { type: String, match: URL },
        comments: { type: String },
    },
    arnr16s: {
        completeness: { type: String, required: true },
        size: { type: String, required: true },
        sequenceFile: { type: String, required: true, match: URL },
        macrogenFile: { type: String, match: URL },
        comments: { type: String },
    },
    characterization: {
        growingMedia: { type: [String], required: true },
        notGrowingMedia: { type: [String] },
        mycelial: { type: String, required: true },
        coloniesDay: { type: Number, min: 0 },
        sporulationDay: { type: Number, min: 0 },
        biomassDay: { type: Number, min: 0 },
        shape: { type: String },
        border: { type: String },
        elevation: { type: String },
        surface: { type: String },
        color: { type: String },
        transparency: { type: String },
        brightness: { type: String },
        comments: { type: String },
    },
    genome: {
        rawData: { type: String, match: URL },
        comments: { type: String },
    },
    bioactivity: {
        file: { type: String, match: URL },
        yes: { type: [String] },
        no: { type: [String] },
        na: { type: [String] },
        comments: { type: String },
    },
    metabolomics: {
        medinaFoundationReports: { type: String, match: URL },
        rawData: { type: String, match: URL },
        comments: { type: String },
    },
    enzymes: {
        yes: { type: [String] },
        no: { type: [String] },
        na: { type: [String] },
        comments: { type: String },
    },
}, { timestamps: true });

type Actinobacteria = InferSchemaType<typeof actinobacteriaSchema>;

export default model<Actinobacteria>("Actinobacteria", actinobacteriaSchema);