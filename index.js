const puppeteer = require('puppeteer');
const fs = require("fs")

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

async function scrapeYouTubeVideos(query) {
  // Launch a headless browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Format the search query and navigate to the YouTube search URL
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
  await page.goto(searchUrl, { waitUntil: 'load', timeout: 0 });

  // Wait for the video elements to load on the page
  await page.waitForSelector('a#video-title');

  // Scroll and load more videos
  let previousHeight;
  while (true) {
    // Evaluate the scrollHeight to ensure the page is still loading new content
    let scrollHeight = await page.evaluate('document.documentElement.scrollHeight');
    
    if (previousHeight === scrollHeight) {
      // Break the loop if the scroll height does not change, indicating no more content to load
      break;
    }

    previousHeight = scrollHeight;

    // Scroll down the page
    await page.evaluate('window.scrollTo(0, document.documentElement.scrollHeight)');

    // Wait for new content to load
    await delay(2000);
    // await page.waitForTimeout(2000);
  }

  // Extract the video titles and URLs
  const videos = await page.evaluate(() => {
    const videoElements = document.querySelectorAll('a#video-title');
    const videoData = [];
    
    videoElements.forEach(video => {
      const title = video.getAttribute('title');
      const url = `https://www.youtube.com${video.getAttribute('href')}`;
      videoData.push({ title, url });
    });

    return videoData;
  });

  // Log the extracted video data
  console.log('Programming Videos:', videos);
  // fs.write(videos,"/programming_tutorials.json")
  fs.writeFile("programming_tutorials.json", JSON.stringify(videos, null, 2), (err)=>{
    if(err){
      console.log("there is some error while writing file")
    }else{
      console.log("file added successfully")
    }
  })

  // Close the browser
  await browser.close();
}

// Call the function with the search query 'programming tutorials'
scrapeYouTubeVideos('programming tutorials');

