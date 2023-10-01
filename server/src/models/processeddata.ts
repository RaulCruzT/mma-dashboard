import { Schema, InferSchemaType, model } from 'mongoose';

const processedDataSchema = new Schema({
    creator: { type: Schema.Types.ObjectId, required: true, ref: "User", select: false },
    // actinobacteria: { type: Schema.Types.ObjectId, required: true, ref: "Actinobacteria", select: false },
    massDetection: {type: String, required: true },
    chromatogramBuilder: {type: String, required: true },
    deconvolution: {type: String, required: true },
    isotope: {type: String, required: true },
    filtered: {type: String, required: true },
    identification: {type: String },
    alignment: {type: String },
    gapFilling: {type: String },
    comments: {type: String }

}, { timestamps: true });

type ProcessedData = InferSchemaType<typeof processedDataSchema>;

export default model<ProcessedData>("ProcessedData", processedDataSchema);