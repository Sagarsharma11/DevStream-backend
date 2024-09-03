// const puppeteer = require('puppeteer');
// const fs = require('fs');

// // Function to introduce delay
// function delay(time) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, time);
//   });
// }

// async function scrapeYouTubeVideos(query) {
//   try {
//     // Launch a headless browser
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();

//     // Format the search query and navigate to the YouTube search URL
//     const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
//     await page.goto(searchUrl, { waitUntil: 'load', timeout: 0 });

//     // Wait for the video elements to load on the page
//     await page.waitForSelector('a#video-title');

//     let videos = [];
//     let previousHeight;

//     // Scroll and load more videos until we have 50 or until no more videos are loaded
//     while (videos.length < 2) {
//       // Extract the video titles, URLs, thumbnail images, channel names, view counts, and upload times
//       const newVideos = await page.evaluate(() => {
//         const videoElements = document.querySelectorAll('ytd-video-renderer');
//         const videoData = [];

//         videoElements.forEach(video => {
//           const titleElement = video.querySelector('a#video-title');
//           const thumbnailElement =  video.querySelector('ytd-thumbnail img');
//           const channelElement = video.querySelector('ytd-channel-name a');
//           const viewElement = video.querySelector('ytd-video-meta-block #metadata-line .inline-metadata-item:nth-of-type(1)');
//           const uploadTimeElement = video.querySelector('ytd-video-meta-block #metadata-line .inline-metadata-item:nth-of-type(2)');


//           const title = titleElement ? titleElement.getAttribute('title') : 'No title available';
//           const url = titleElement ? `https://www.youtube.com${titleElement.getAttribute('href')}` : 'No URL available';
//           const thumbnailUrl = thumbnailElement ? thumbnailElement["lazyData"]["sources"][0]["url"] : 'Thumbnail not available';
//           const channelName = channelElement ? channelElement.innerText : 'No channel name available';
//           const views = viewElement ? viewElement.innerText : 'No views available';
//           const uploadTime = uploadTimeElement ? uploadTimeElement.innerText : 'No upload time available';

//           videoData.push({ title, url, thumbnailUrl, channelName, views, uploadTime });
//         });

//         return videoData;
//       });

//       // Add new videos to the list, avoiding duplicates
//       newVideos.forEach(video => {
//         if (!videos.some(v => v.url === video.url)) {
//           videos.push(video);
//           console.log(`Title: ${video.title}`);
//           console.log(`URL: ${video.url}`);
//           console.log(`Thumbnail URL: ${video.thumbnailUrl}`);
//           console.log(`Channel Name: ${video.channelName}`);
//           console.log(`Views: ${video.views}`);
//           console.log(`Upload Time: ${video.uploadTime}`);
//           console.log('-----------------------------------------');
//         }
//       });

//       console.log(`Total videos extracted so far for query "${query}": ${videos.length}`);

//       // Scroll down the page
//       previousHeight = await page.evaluate('document.documentElement.scrollHeight');
//       await page.evaluate('window.scrollTo(0, document.documentElement.scrollHeight)');

//       // Wait for new content to load
//       await delay(3000); // Increased delay to allow more time for loading

//       // Check if more videos are loaded
//       let newHeight = await page.evaluate('document.documentElement.scrollHeight');
//       if (newHeight === previousHeight) {
//         console.log(`No more videos to load for query "${query}", stopping.`);
//         break;
//       }
//     }

//     // Save the extracted video data to a JSON file
//     fs.writeFile(`public/data/${query.replace(/\s+/g, '_')}.json`, JSON.stringify(videos, null, 2), err => {
//       if (err) {
//         console.log('There is some error while writing file:', err);
//       } else {
//         console.log(`File for query "${query}" added successfully`);
//       }
//     });

//     // Close the browser
//     await browser.close();
//   } catch (error) {
//     console.log(`Error while scraping for query "${query}":`, error);
//   }
// }

// // Call the function for each query in the array
// async function main() {
//   const queries = [
//     "role base access control",
//     "HTML ",
//     "CSS ",
//     "JavaScript ",
//     "Node.js ",
//     "React.js ",
//     "Next.js ",
//     "MongoDB ",
//     "Express.js ",
//     "python programming",
//     "Django ",
//     "SQL ",
//     "Git ",
//     "Docker ",
//     "Kubernetes ",
//     "AWS ",
//     "Microservices architecture",
//     "Serverless architecture",
//     "CI/CD pipelines",
//     "GraphQL ",
//     "REST API design",
//     "WebSockets ",
//     "JWT Authentication ",
//     "Jest testing in JavaScript",
//     "JavaScript design patterns",
//     "Web performance optimization",
//     "Async in JavaScript",
//     "TypeScript ",
//     "Modern CSS techniques",
//     "Progressive Web Apps development",
//     "Terraform ",
//     "MERN stack ",
//     "Neo4j ",
//     "Kafka ",
//     "React Native development",
//     "Monorepos in software development",
//     "Software architecture patterns",
//     "DevOps practices",
//     "GCP cloud computing",
//     "Cloud computing with AWS",
//     "System design interview preparation",
//     "Event-driven architecture",
//     "SaaS application development",
//     "APIs and microservices",
//     "Data Structures and Algorithms"
//   ];

//   for (const query of queries) {
//     await scrapeYouTubeVideos(query);
//     await delay(5000);
//   }
// }

// // Start the scraping process
// main();


import nodemailer from 'nodemailer';

// Create a transport object using your email service provider's configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like 'hotmail', 'yahoo', etc.
  auth: {
    user: 'ss365493@gmail.com', // Your email address
    pass: 'CL900ffxx@71L'    // Your email password or an app-specific password
  }
});

// Function to send an email
export async function sendEmail() {
  const mailOptions = {
    from: 'sagarsharmatech00@gmail.com', // Sender address
    to: 'recipient@example.com',  // Dummy recipient
    subject: 'Test Email Subject', // Dummy subject
    text: 'Hello, this is a test email with plain text.', // Dummy plain text body
    html: '<p>Hello, this is a <b>test</b> email with HTML.</p>' 
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

sendEmail();