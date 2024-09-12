import Queue from "bull";
import giantService from "../scrap/giant.scrapper.js";
// Create a queue for processing YouTube data
const youtubeQueue = new Queue('youtube-data-fetch', {
    redis: {
      host: '127.0.0.1',
      port: 6379,
    },
  });

youtubeQueue.process(async(job, done)=>{
    try {
        console.log("new job came into the queue")
        console.log("fetching data of Keywords: ",job.data.queries)
        const data = await giantService(job.data.queries, job.data.limit);
        console.log("job is done")  
        console.log(data);

        // await sendEmailNotification(job.data.email, data);
        console.log("data is fetched")
    
        done();
      } catch (error) {
        console.error("Error processing job:", error);
        done(error); 
      }
})

export {youtubeQueue}