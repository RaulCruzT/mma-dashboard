import { Schema, InferSchemaType, model } from 'mongoose';

const generaSchema = new Schema({
    name: { type: String, required: true, unique: true, minLength: 1 },
}, { timestamps: true });

type Genera = InferSchemaType<typeof generaSchema>;

export default model<Genera>("Genera", generaSchema);