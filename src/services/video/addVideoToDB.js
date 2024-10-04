import { Video } from "../../models/video.model.js";
import mongoose from "mongoose";

const addVideoToDB = async (videoDataArray) => {
  try {
    for (const videoData of videoDataArray) {
      const existingVideo = await Video.findOne({channelName: videoData.channelName,
        title: videoData.title,});

      if (existingVideo) {
        console.log('Video already exists:', existingVideo);
        // return existingVideo;
        continue;
      }

      // Create a new video if it doesn't exist
      // const newVideo = new Video(videoData);
      // Insert the duplicate video into another collection (e.g., 'duplicate_videos')
      await mongoose.connection.collection('parallel_videos').insertOne(videoData);
      // await newVideo.save();
      console.log('New video created:', videoData);
    }
    return true;
  } catch (error) {
    console.error('Error adding video to DB:', error);
    return false;
  }
}

export { addVideoToDB };
