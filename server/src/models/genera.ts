import { Schema, InferSchemaType, model } from 'mongoose';

const generaSchema = new Schema({
    name: { type: String, required: true, unique: true, minLength: 1 },
    creator: { type: Schema.Types.ObjectId, ref: "User", select: false },
}, { timestamps: true });

type Genera = InferSchemaType<typeof generaSchema>;

export default model<Genera>("Genera", generaSchema);