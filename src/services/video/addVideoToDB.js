import { Video } from "../../models/video.model.js";

const addVideoToDB = async (videoDataArray) => {
  try {
    for (const videoData of videoDataArray) {
      const existingVideo = await Video.findOne({ url: videoData.url });

      if (existingVideo) {
        console.log('Video already exists:', existingVideo);
        return existingVideo;
      }

      // Create a new video if it doesn't exist
      const newVideo = new Video(videoData);
      await newVideo.save();
      console.log('New video created:', newVideo);
    }
    return true;
  } catch (error) {
    console.error('Error adding video to DB:', error);
    return false;
  }
}

export { addVideoToDB };
