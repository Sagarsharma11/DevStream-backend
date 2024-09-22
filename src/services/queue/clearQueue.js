import Queue from "bull";
// Assuming you have already created a queue instance
const myQueue = new Queue('youtube-data-fetch', {
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
});

// Clear the queue
const clearQueue = async () => {
  try {
    await myQueue.empty();
    console.log('Queue cleared successfully.');
  } catch (error) {
    console.error('Error clearing the queue:', error);
  }
};

export default clearQueue;