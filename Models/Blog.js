import mongoose from "mongoose";

const blogScheme = new mongoose.Schema({
    id: String,
    author: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    img: { type: String, default: '/img.jpg' }
})

export const Blog = mongoose.models.Blog || mongoose.model('Blog', blogScheme);