const fetch = require("node-fetch");
const moment = require("moment");
const redis = require("redis");
const { promisify } = require("util");
const client = redis.createClient();

const setAsync = promisify(client.set).bind(client);

const baseURL = "https://jobs.github.com/positions.json";

//fetch all pages
const fetchGithub = async () => {
  let jobCount = 1;
  let onPage = 1;
  const allJobs = [];
  while (jobCount > 0) {
    const res = await fetch(`${baseURL}/?page=${onPage}`);
    const jobs = await res.json();
    allJobs.push(...jobs);
    jobCount = jobs.length;
    console.log("get", jobCount, "Github jobs");
    onPage++;
  }

  console.log("Got", allJobs.length, "Github jobs total.");

  //filter algorithm
  const jrJobs = allJobs.filter((job) => {
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

  console.log("filtered down to", jrJobs.length, "Github jobs");

  //Change date format
  jrJobs.forEach((job) => {
    const dt = moment(new Date(job.created_at)).format("MM/DD/YYYY");
    job.created_at = dt;
  });

  //set in redis
  const success = await setAsync("github", JSON.stringify(jrJobs));

  console.log({ success });
};

fetchGithub();

module.exports = fetchGithub;
