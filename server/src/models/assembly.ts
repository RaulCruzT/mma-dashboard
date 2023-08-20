import { Schema, InferSchemaType, model } from 'mongoose';

const URL = [/^(http|https):\/\/[^ "]+$/, 'Please enter a valid URL.'];

const assemblySchema = new Schema({
    name: { type: String, required: true, unique: true },
    creator: { type: Schema.Types.ObjectId, ref: "User", select: false },
    actinobacteria: { type: Schema.Types.ObjectId, ref: "Actinobacteria", select: false },
    date: { type: Date, required: true },
    bgcs: { type: String, match: URL },
    softwareTrimming: { type: String, required: true },
    softwareAssembly: { type: String, required: true },
    parametersAssembly: { type: String, required: true },
    qualityFinal: { type: String, required: true },
    comments: { type: String },
    link: { type: String, match: URL }
}, { timestamps: true });

type Assembly = InferSchemaType<typeof assemblySchema>;

export default model<Assembly>("Assembly", assemblySchema);