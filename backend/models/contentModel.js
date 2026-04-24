const mongoose = require('mongoose');
const { Schema } = mongoose;

const contentSchema = new Schema({
    commitId: {
        type: String,
        required: true,
        unique: true,
    },
    message: {
        type: String,
    },
    date: {
        type: String,
    },
    files: {
        type: [String],
        default: [],
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });

const Content = mongoose.model("Content", contentSchema);
module.exports = Content;