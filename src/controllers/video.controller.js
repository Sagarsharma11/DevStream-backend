import { Video } from "../models/video.model.js";
import giantService from "../services/scrap/giant.scrapper.js";
import {youtubeQueue} from "../services/queue/youtubeQueue.js";

const fetchAllYoutubeData = async(req, res)=>{
    try {

        const queries = [
            "role base access control",
            "HTML ",
            "CSS ",
            "JavaScript ",
            "Node.js ",
            "React.js ",
            "Next.js ",
            "MongoDB ",
            "Express.js ",
            "python programming",
            "Django ",
            "SQL ",
            "Git ",
            "Docker ",
            "Kubernetes ",
            "AWS ",
            "Microservices architecture",
            "Serverless architecture",
            "CI/CD pipelines",
            "GraphQL ",
            "REST API design",
            "WebSockets ",
            "JWT Authentication ",
            "Jest testing in JavaScript",
            "JavaScript design patterns",
            "Web performance optimization",
            "Async in JavaScript",
            "TypeScript ",
            "Modern CSS techniques",
            "Progressive Web Apps development",
            "Terraform ",
            "MERN stack ",
            "Neo4j ",
            "Kafka ",
            "React Native development",
            "Monorepos in software development",
            "Software architecture patterns",
            "DevOps practices",
            "GCP cloud computing",
            "Cloud computing with AWS",
            "System design interview preparation",
            "Event-driven architecture",
            "SaaS application development",
            "APIs and microservices",
            "Data Structures and Algorithms"
          ];
          youtubeQueue.add({queries, limit:5000})

        return res.status(200).json({
            statusCode:200,
            success:true,
            message:`Data fetching from youtube starts on these topics\n ${queries} `
        })
    } catch (error) {
        console.log(error)
    }
}

const getAllData = async(req,res)=>{
    try {
      const { limit, offset} = req.query;

      const limitNum = parseInt(limit, 10);
      const offsetNum = parseInt(offset, 10);


        const data = await Video.find({}).limit(limit).skip(offsetNum);

        if(!data)return res.status(200).json({
            statusCode:200,
            success:true,
            message:"No data found in DB",
        })

        return res.status(200).json({
            statusCode:200,
            success:true,
            message:"Fetched data successfully",
            data:data,
        })
    } catch (error) {
        return res.status(500).json({
            statusCode:500,
            success:false,
            message:`Internal Server Error, Error:${error}`,
        })
    }
}

const getLatestResult = async(req, res)=>{
    try {
        const { search} = req.query;
        const queries = [];
        queries.push(search);
        const limit = 2;
        const result = await giantService(queries, limit);

        if(!result.length) return res.status(500).json({
            statusCode:500,
            success:false,
            message:"Error while fetching data from YT",
        })
          return res.status(200).json({
              statusCode:200,
              success:true,
              message:"Fetched data successfully",
              data:result,
          })
      } catch (error) {
          return res.status(500).json({
              statusCode:500,
              success:false,
              message:`Internal Server Error, Error:${error}`,
          })
      }
}

export {fetchAllYoutubeData, getAllData, getLatestResult}