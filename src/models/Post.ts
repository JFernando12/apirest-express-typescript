import { Schema, model } from "mongoose";

const postSchema = new Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    content: { type: String, required: true},
    image: String,
    createAt: { type: Date, default: Date.now },
    updateAt: Date
});

export default model("Post", postSchema);