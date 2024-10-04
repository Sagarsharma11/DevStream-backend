import { Video } from "../models/video.model.js";
import giantService from "../services/scrap/giant.scrapper.js";
import { youtubeQueue } from "../services/queue/youtubeQueue.js";
import clearQueueService from "../services/queue/clearQueue.js";
import mongoose from "mongoose";

const fetchAllYoutubeData = async (req, res) => {
    try {
        const { limit } = req.body;
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

        youtubeQueue.add({ queries, limit })

        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: `Data fetching from youtube starts on these topics\n ${queries} `
        })
    } catch (error) {
        console.log(error)
    }
}

const getAllData = async (req, res) => {
    try {
        const { limit, offset } = req.query;

        const limitNum = parseInt(limit, 10);
        const offsetNum = parseInt(offset, 10);


        const data = await Video.find({}).limit(limit).skip(offsetNum);

        if (!data) return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "No data found in DB",
        })

        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Fetched data successfully",
            data: data,
        })
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: `Internal Server Error, Error:${error}`,
        })
    }
}

// const getLatestResult = async (req, res) => {
//     try {
//         const { search, limit, offset } = req.query;

//         const limitNum = Number(limit) || 10;
//         const offsetNum = Number(offset) || 0;

//         let whereCondition = [];
//         // Check search query parameter
//         if (search && search !== "") {
//             // Convert search to regex for string fields
//             const regexForStringFields =
//                 typeof search === "number"
//                     ? search.toString()
//                     : new RegExp(search, "i");
//             const conditions = Object.keys(Video.schema.paths)
//                 .map((field) => {
//                     const fieldType = Video.schema.paths[field].instance;
//                     if (fieldType === "String") {
//                         return { [field]: regexForStringFields };
//                     } else {
//                         return null;
//                     }
//                 })
//                 .filter((condition) => condition !== null);

//             whereCondition = {
//                 $or: conditions,
//             };
//         }

//         console.log(`where conditions `, whereCondition);

//         const pipeline = [
//             {
//                 $match: whereCondition, // Match documents based on whereCondition
//             },
//             {
//                 $project: {
//                     __v: 0,
//                     // createdAt: 0,
//                     // updatedAt: 0,
//                     // _id: 0,
//                 },
//             },
//             {
//                 $skip: offsetNum,
//             },
//             {
//                 $limit: limitNum,
//             },
//         ];
//         const result = await Video.aggregate(pipeline)
//         if (!result.length) return res.status(500).json({
//             statusCode: 500,
//             success: false,
//             message: "Error while fetching data from YT",
//         })
//         return res.status(200).json({
//             statusCode: 200,
//             success: true,
//             message: "Fetched data successfully",
//             data: result,
//         })
//     } catch (error) {
//         return res.status(500).json({
//             statusCode: 500,
//             success: false,
//             message: `Internal Server Error, Error:${error}`,
//         })
//     }
// }

const getLatestResult = async (req, res) => {
    try {
        const { search, limit, offset } = req.query;

        let limitNum = Number(limit) || 12; // Default limit to 10 if not provided
        let offsetNum = Number(offset) || 0; // Default offset to 0 if not provided

        let whereCondition = {}; // Initialize as an empty object for no filtering

        // If search is provided and not an empty string, create search conditions
        if (search && search !== "") {
            const regexForStringFields =
                typeof search === "number"
                    ? search.toString()
                    : new RegExp(search, "i");

            // Map over the schema fields and create conditions for each string field
            const conditions = Object.keys(Video.schema.paths)
                .map((field) => {
                    const fieldType = Video.schema.paths[field].instance;
                    if (fieldType === "String") {
                        return { [field]: regexForStringFields };
                    } else {
                        return null;
                    }
                })
                .filter((condition) => condition !== null);

            // Set the whereCondition to match one or more fields
            whereCondition = {
                $or: conditions,
            };
        }

        console.log(`where conditions: `, whereCondition);

        // First, count the total videos (filtered or not) based on the whereCondition
        const totalVideos = await Video.countDocuments(whereCondition);

        // Check if (limit + offset) exceeds totalVideos
        if ((limitNum + offsetNum) > totalVideos) {
            // Adjust limit to the number of remaining videos
            limitNum = totalVideos - offsetNum;
            if (limitNum < 0) {
                limitNum = 0; // Ensure limit is not negative
            }
        }

        const pipeline = [
            {
                $match: whereCondition, // Match documents based on whereCondition (empty object means no filter)
            },
            {
                $project: {
                    __v: 0, // Exclude version key
                },
            },
            {
                $skip: offsetNum, // Skip results based on offset
            },
            {
                $limit: limitNum, // Limit results based on limit
            },
        ];

        const result = await Video.aggregate(pipeline);

        // If no result is found, return an error response
        if (!result.length) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: "Data Not found",
            });
        }

        // Return the fetched data successfully
        return res.status(200).json({
            len: totalVideos,
            statusCode: 200,
            success: true,
            message: "Fetched data successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error in fetching data: ", error);
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: `Internal Server Error: ${error.message}`,
        });
    }
};


const clearQueue = async (req, res) => {
    try {
        const isClear = clearQueueService();

        if (!isClear) throw new Error("Error while clear the queue")
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Queue cleared successfully!",
        })
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: `Internal Server Error, Error:${error}`,
        })
    }
}

const updateTheCollection = async (req, res) => {
    try {
        const parallelVideosCursor = await mongoose.connection.collection('parallel_videos').find({});
        const parallelVideos = await parallelVideosCursor.toArray();

        const numberOfVideosToSelect = parallelVideos.length; // Set a limit or use req.query for dynamic selection
        const set = new Set();

        while (set.size < numberOfVideosToSelect) {
            const randomIndex = Math.floor(Math.random() * parallelVideos.length); // Corrected random index generation
            set.add(parallelVideos[randomIndex]);
            console.log("Object pushed into the DB:", parallelVideos[randomIndex]);
        }

        const randomVideos = Array.from(set); // Convert Set back to Array
        console.log(`random array generated ready for DB Bulk entry`);
        await Video.insertMany(randomVideos);

        res.status(200).json({
            success: true,
            message: "Videos collection updated successfully"
        });
    } catch (error) {
        console.error("Error fetching parallel videos:", error); // Log error for debugging
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: "Internal Server Error",
        });
    }
};


export { fetchAllYoutubeData, getAllData, getLatestResult, clearQueue, updateTheCollection }