import { Video } from "../models/video.model.js";
import giantService from "../services/scrap/giant.scrapper.js";
import {youtubeQueue} from "../services/queue/youtubeQueue.js";
import  clearQueueService  from "../services/queue/clearQueue.js";

const fetchAllYoutubeData = async(req, res)=>{
    try {
        const {limit} = req.body;
          const queries = [
            "Role-Based Access Control (RBAC)",
            "HTML5",
            "CSS3",
            "JavaScript ES6+",
            "Node.js",
            "React.js",
            "Next.js",
            "MongoDB",
            "Express.js",
            "Python Programming",
            "Django",
            "Flask",
            "FastAPI",
            "SQL (MySQL, PostgreSQL, SQLite)",
            "NoSQL Databases",
            "Git & GitHub",
            "Docker",
            "Kubernetes",
            "AWS",
            "Azure Cloud",
            "Google Cloud (GCP)",
            "Microservices Architecture",
            "Serverless Architecture",
            "CI/CD Pipelines",
            "GraphQL",
            "REST API Design",
            "WebSockets",
            "JWT Authentication",
            "OAuth2 Authentication",
            "Jest Testing in JavaScript",
            "Mocha & Chai Testing",
            "Cypress Testing",
            "JavaScript Design Patterns",
            "SOLID Principles",
            "Web Performance Optimization",
            "Asynchronous JavaScript (Promises, async/await)",
            "TypeScript",
            "Modern CSS Techniques (CSS Grid, Flexbox)",
            "Progressive Web Apps (PWAs)",
            "Web Accessibility",
            "Terraform",
            "MERN Stack Development",
            "JAMstack Development",
            "Neo4j (Graph Databases)",
            "Apache Kafka",
            "Redis",
            "React Native Development",
            "Mobile App Development (iOS & Android)",
            "Monorepos in Software Development",
            "Software Architecture Patterns",
            "Design Systems",
            "DevOps Practices",
            "Cloud Computing (AWS, Azure, GCP)",
            "System Design Interviews",
            "Event-Driven Architecture",
            "SaaS Application Development",
            "APIs & Microservices",
            "Data Structures & Algorithms",
            "Functional Programming (FP)",
            "Object-Oriented Programming (OOP)",
            "Graph Algorithms",
            "Distributed Systems",
            "Blockchain Development",
            "WebAssembly (Wasm)",
            "Machine Learning with Python",
            "Artificial Intelligence Basics",
            "Natural Language Processing (NLP)",
            "Data Science with Python",
            "TensorFlow & PyTorch",
            "Ethical Hacking & Cybersecurity",
            "Kubernetes Operators",
            "Event-Streaming Architecture",
            "Caching with Redis & Memcached",
            "Observability & Monitoring (Prometheus, Grafana)",
            "Web3 Development",
            "Rust Programming Language",
            "Go Programming Language (Golang)",
            "C++ Advanced Programming",
            "Java Spring Boot",
            "Kotlin for Android Development",
            "Software Testing & Test Automation",
            "Performance Testing (JMeter, Locust)",
            "Load Balancing & High Availability",
            "SQL Query Optimization",
            "Docker Swarm & Kubernetes Orchestration",
            "CI/CD with Jenkins & GitLab CI",
            "API Rate Limiting & Throttling",
            "OAuth, SSO & Identity Management",
            "Multi-Cloud Architectures",
            "Version Control with Git & Subversion"
        ];
        
          youtubeQueue.add({queries, limit})

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


const clearQueue = async(req, res)=>{
    try {
        const isClear = clearQueueService();

        if(!isClear) throw new Error("Error while clear the queue")
          return res.status(200).json({
              statusCode:200,
              success:true,
              message:"Queue cleared successfully!",
          })
      } catch (error) {
          return res.status(500).json({
              statusCode:500,
              success:false,
              message:`Internal Server Error, Error:${error}`,
          })
      }
}



export {fetchAllYoutubeData, getAllData, getLatestResult, clearQueue}