import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["minimal", "dark", "creative", "professional", "brand"],
    },
    templatePath: {
      type: String,
      required: true,
    },
    previewImage: {
      type: String,
      default: "",
    },
    schema: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    isOfficial: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Template", templateSchema);
