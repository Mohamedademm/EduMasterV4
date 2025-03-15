const express = require("express");
const axios = require("axios");

const router = express.Router();

let cache = {
  data: null,
  index: null,
  lastFetched: 0
};

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

function buildTagIndex(pages) {
  const index = {};
  pages.forEach(page => {
    if (page.tags && Array.isArray(page.tags)) {
      page.tags.forEach(tag => {
        if (!index[tag]) {
          index[tag] = [];
        }
        index[tag].push(page);
      });
    }
  });
  return index;
}

router.get("/scraped-data", async (req, res) => {
  try {
    const currentTime = Date.now();
    let pages;

    if (cache.data && (currentTime - cache.lastFetched < CACHE_DURATION)) {
      pages = cache.data;
      console.log("📦 Using cached data.");
    } else {
      const url = "https://roadmap.sh/pages.json";
      console.log(`🔎 Fetching data from: ${url}`);
      const response = await axios.get(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          "Accept-Language": "en-US,en;q=0.9"
        }
      });
      pages = response.data;
      cache.data = pages;
      cache.lastFetched = currentTime;
      cache.index = buildTagIndex(pages);
        console.log("💾 Cache updated.");
    }

    const tagFilter = req.query.tag;
    if (tagFilter && cache.index) {
      return res.json(cache.index[tagFilter] || []);
    }

    res.json(pages);
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

module.exports = router;
