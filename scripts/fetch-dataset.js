import "dotenv/config";
import fs from "fs";

async function run() {
  const token = process.env.APIFY_API_TOKEN;
  const res = await fetch(`https://api.apify.com/v2/datasets/f8eBbjcd2pf5VdwxY/items?token=${token}&format=json`);
  const data = await res.json();
  fs.writeFileSync("leads-export-new.json", JSON.stringify(data));
  console.log("Downloaded " + data.length + " items");
}

run();
