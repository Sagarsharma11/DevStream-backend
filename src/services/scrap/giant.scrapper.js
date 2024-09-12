import puppeteer from "puppeteer";
import fs from "fs";
import {addVideoToDB} from "../video/addVideoToDB.js"


// Function to introduce delay
function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

async function scrapeYouTubeVideos(query, limit) {
  try {
    // Launch a headless browser
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Format the search query and navigate to the YouTube search URL
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    await page.goto(searchUrl, { waitUntil: 'load', timeout: 0 });

    // Wait for the video elements to load on the page
    await page.waitForSelector('a#video-title');

    let videos = [];
    let previousHeight;

    // Scroll and load more videos until we have 50 or until no more videos are loaded
    while (videos.length < limit) {
      // Extract the video titles, URLs, thumbnail images, channel names, view counts, and upload times
      const newVideos = await page.evaluate(() => {
        const videoElements = document.querySelectorAll('ytd-video-renderer');
        const videoData = [];

        videoElements.forEach(video => {
          const titleElement = video.querySelector('a#video-title');
          const thumbnailElement = video.querySelector('ytd-thumbnail img');
          const channelElement = video.querySelector('ytd-channel-name a');
          const viewElement = video.querySelector('ytd-video-meta-block #metadata-line .inline-metadata-item:nth-of-type(1)');
          const uploadTimeElement = video.querySelector('ytd-video-meta-block #metadata-line .inline-metadata-item:nth-of-type(2)');


          const title = titleElement ? titleElement.getAttribute('title') : 'No title available';
          const url = titleElement ? `https://www.youtube.com${titleElement.getAttribute('href')}` : 'No URL available';
          const thumbnailUrl = thumbnailElement ? thumbnailElement["lazyData"]["sources"][0]["url"] : 'Thumbnail not available';
          const channelName = channelElement ? channelElement.innerText : 'No channel name available';
          const views = viewElement ? viewElement.innerText : 'No views available';
          const uploadTime = uploadTimeElement ? uploadTimeElement.innerText : 'No upload time available';

          videoData.push({ title, url, thumbnailUrl, channelName, views, uploadTime });
        });

        return videoData;
      });

      // Add new videos to the list, avoiding duplicates
      newVideos.forEach(video => {
        if (!videos.some(v => v.url === video.url)) {
          videos.push(video);
          console.log(`Title: ${video.title}`);
          console.log(`URL: ${video.url}`);
          console.log(`Thumbnail URL: ${video.thumbnailUrl}`);
          console.log(`Channel Name: ${video.channelName}`);
          console.log(`Views: ${video.views}`);
          console.log(`Upload Time: ${video.uploadTime}`);
          console.log('-----------------------------------------');
        }
      });

      console.log(`Total videos extracted so far for query "${query}": ${videos.length}`);

      // Scroll down the page
      previousHeight = await page.evaluate('document.documentElement.scrollHeight');
      await page.evaluate('window.scrollTo(0, document.documentElement.scrollHeight)');

      // Wait for new content to load
      await delay(3000); // Increased delay to allow more time for loading

      // Check if more videos are loaded
      let newHeight = await page.evaluate('document.documentElement.scrollHeight');
      if (newHeight === previousHeight) {
        console.log(`No more videos to load for query "${query}", stopping.`);
        break;
      }
    }


    // Save the extracted video data to a JSON file
    fs.writeFile(`public/data/${query.replace(/\s+/g, '_')}.json`, JSON.stringify(videos, null, 2), err => {
      if (err) {
        console.log('There is some error while writing file:', err);
      } else {
        console.log(`File for query "${query}" added successfully`);
      }
    });

    // Close the browser
    await browser.close();

    return videos;
  } catch (error) {
    console.log(`Error while scraping for query "${query}":`, error);
  }
}

// Call the function for each query in the array
async function main(queries, limit) {
  console.log("Youtube scrapping starts ..................")
  let allVideos = [];

  for (const query of queries) {
    const videosArray = await scrapeYouTubeVideos(query, limit);
    await addVideoToDB(videosArray);
    allVideos.push(...videosArray);
    await delay(6000);
  }
  return allVideos;
}

export default main
