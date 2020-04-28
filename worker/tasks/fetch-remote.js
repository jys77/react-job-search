const fetch = require("node-fetch");
const redis = require("redis");
const { promisify } = require("util");
const client = redis.createClient();

const setAsync = promisify(client.set).bind(client);

const baseURL = "https://remoteok.io/api";

//fetch algorithm
const fetchRemote = async () => {
  const RemoteJobs = [];
  const res = await fetch(baseURL);
  const jobs = await res.json();
  RemoteJobs.push(...jobs);
  const RJobs = RemoteJobs.slice(1, RemoteJobs.length);
  console.log("Got", RJobs.length, "Remote Jobs.");

  const AllRemoteJobs = RJobs.map((job) => {
    return {
      company: job.company,
      company_logo: job.company_logo,
      created_at: job.date,
      description: job.description,
      id: job.id,
      url: job.url,
      title: job.position,
    };
  });

  //filter algorithm
  const RemoteJrJobs = AllRemoteJobs.filter((job) => {
    const jobTitle = job.title.toLowerCase();

    let isJunior = true;

    if (
      jobTitle.includes("senior") ||
      jobTitle.includes("manager") ||
      jobTitle.includes("sr.") ||
      jobTitle.includes("architect")
    ) {
      isJunior = false;
    }
    return isJunior;
  });

  console.log("Filtered to", RemoteJrJobs.length, "remote jobs");

  //set in redis
  const success = await setAsync("remote", JSON.stringify(RemoteJrJobs));

  console.log({ success });
};

fetchRemote();

module.exports = fetchRemote;
