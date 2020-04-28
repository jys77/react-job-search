const express = require("express");
const redis = require("redis");
const { promisify } = require("util");

const app = express();
const client = redis.createClient();

const getAsync = promisify(client.get).bind(client);

const PORT = 3001 || process.env.PORT;
const Proxy = "http://localhost:3000";

app.get("/api/jobs/github", async (req, res) => {
  const jobs = await getAsync("github");
  console.log("Github Jobs: ", JSON.parse(jobs).length);
  res.header("Access-Control-Allow-Origin", Proxy);
  return res.send(jobs);
});

app.get("/api/jobs/remoteok", async (req, res) => {
  const jobs = await getAsync("remote");
  console.log("RemoteOK Jobs: ", JSON.parse(jobs).length);
  res.header("Access-Control-Allow-Origin", Proxy);
  return res.send(jobs);
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
