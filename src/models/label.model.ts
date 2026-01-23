import mongoose, { Schema } from "mongoose";
import { TAG_COLOR } from "../config/colors";

const tagSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 60 },
    color: { type: String, required: false, enum: TAG_COLOR },
    isfavorite: { type: Boolean, default: false },

    // Relations
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const tagModel = mongoose.model("Tag", tagSchema);

export default tagModel;
