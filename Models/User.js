import mongoose from "mongoose";

const userShema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' }
});

export const User = mongoose.models.User || mongoose.model('User', userShema);