const express = require("express");
const redis = require("redis");
const { promisify } = require("util");

const app = express();
const client = redis.createClient();

const getAsync = promisify(client.get).bind(client);

const PORT = 3001 || process.env.PORT;

app.get("/api/jobs", async (req, res) => {
  const jobs = await getAsync("github");
  console.log(JSON.parse(jobs).length);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  return res.send(jobs);
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
