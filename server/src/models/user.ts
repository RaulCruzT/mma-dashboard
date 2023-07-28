import { Schema, InferSchemaType, model } from 'mongoose';

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, required: true },
    allProperties: [{ type: Schema.Types.ObjectId, ref: "Property" }],
    role: { type: Number, required: true, default: 0, enum: [0, 1, 2]},
}, { timestamps: true });

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);