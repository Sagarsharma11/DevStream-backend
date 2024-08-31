import { Video } from "../models/video.model.js";
import giantService from "../services/giant.scrapper.js"

const fetchAllYoutubeData = async(req, res)=>{
    try {

        const queries = [
            "role base access control",
            // "HTML ",
            // "CSS ",
            // "JavaScript ",
            // "Node.js ",
            // "React.js ",
            // "Next.js ",
            // "MongoDB ",
            // "Express.js ",
            // "python programming",
            // "Django ",
            // "SQL ",
            // "Git ",
            // "Docker ",
            // "Kubernetes ",
            // "AWS ",
            // "Microservices architecture",
            // "Serverless architecture",
            // "CI/CD pipelines",
            // "GraphQL ",
            // "REST API design",
            // "WebSockets ",
            // "JWT Authentication ",
            // "Jest testing in JavaScript",
            // "JavaScript design patterns",
            // "Web performance optimization",
            // "Async in JavaScript",
            // "TypeScript ",
            // "Modern CSS techniques",
            // "Progressive Web Apps development",
            // "Terraform ",
            // "MERN stack ",
            // "Neo4j ",
            // "Kafka ",
            // "React Native development",
            // "Monorepos in software development",
            // "Software architecture patterns",
            // "DevOps practices",
            // "GCP cloud computing",
            // "Cloud computing with AWS",
            // "System design interview preparation",
            // "Event-driven architecture",
            // "SaaS application development",
            // "APIs and microservices",
            // "Data Structures and Algorithms"
          ];

        const data = await giantService(queries);

        return res.status(200).json({
            statusCode:200,
            success:true,
            data:{
                length:data.length,
                data:data
            }
        })
    } catch (error) {
        
    }
}

export {fetchAllYoutubeData}