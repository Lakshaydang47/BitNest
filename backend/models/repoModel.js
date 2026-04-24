const mongoose = require("mongoose");
const { Schema } = mongoose;

const RepositorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  content: [
    {
      type: Schema.Types.ObjectId,
      ref: "Content",
    },
  ],
  visibility: {
    type: Boolean,
    default: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  issues: [
    {
      type: Schema.Types.ObjectId,
      ref: "Issue",
    },
  ],
  stars: {
    type: Number,
    default: 0,
  },
  stagedFiles: {
    type: [String],
    default: [],
  },
  initialized: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Repository = mongoose.model("Repository", RepositorySchema);
module.exports = Repository;