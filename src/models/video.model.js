import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  channelName: {
    type: String,
    required: true,
  },
  views: {
    type: String,
    required: true,
  },
  uploadTime: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// Create the Mongoose model
export const Video = mongoose.model('Video', videoSchema);