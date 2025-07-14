import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
      trim: true
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    expiresAt: {
      type: Date,
      required: true
    },
    clicks: {
      type: Number,
      default: 0
    },
    lastAccessed: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

export const ShortUrl = mongoose.model("ShortUrl", shortUrlSchema);

