const puppeteer = require('puppeteer');
const fs = require('fs');

// Function to introduce delay
function delay(time) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time);
  });
}

async function scrapeYouTubeVideos(query) {
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

    // Scroll and load more videos until we have 5000
    while (videos.length < 5000) {
      // Extract the video titles and URLs
      const newVideos = await page.evaluate(() => {
        const videoElements = document.querySelectorAll('a#video-title');
        const videoData = [];

        videoElements.forEach(video => {
          const title = video.getAttribute('title');
          const url = `https://www.youtube.com${video.getAttribute('href')}`;
          videoData.push({ title, url });
        });

        return videoData;
      });

      // Add new videos to the list, avoiding duplicates
      newVideos.forEach(video => {
        if (!videos.some(v => v.url === video.url)) {
          videos.push(video);
          console.log(`New video found: ${video.title} - ${video.url}`); // Print each new video link
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
    fs.writeFile(`${query.replace(/\s+/g, '_')}.json`, JSON.stringify(videos, null, 2), err => {
      if (err) {
        console.log('There is some error while writing file:', err);
      } else {
        console.log(`File for query "${query}" added successfully`);
      }
    });

    // Close the browser
    await browser.close();
  } catch (error) {
    console.log(`Error while scraping for query "${query}":`, error);
  }
}

// Call the function for each query in the array
async function main() {
  const queries = [
    "programming tutorials",
    "python tutorials",
    "kafka",
    "react js",
    "terraform",
    "cloud",
    "GCP",
    "aws",
    "system design"
  ];

  for (const query of queries) {
    await scrapeYouTubeVideos(query);
    await delay(5000); 
  }
}

// Start the scraping process
main();
