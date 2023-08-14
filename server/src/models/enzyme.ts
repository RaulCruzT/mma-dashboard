import { Schema, InferSchemaType, model } from 'mongoose';

const enzymeSchema = new Schema({
    name: { type: String, required: true, unique: true, minLength: 1 },
    creator: { type: Schema.Types.ObjectId, ref: "User", select: false },
}, { timestamps: true });

type Enzyme = InferSchemaType<typeof enzymeSchema>;

export default model<Enzyme>("Enzyme", enzymeSchema);