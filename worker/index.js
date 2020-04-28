const CronJob = require("cron").CronJob;

const fetchGithub = require("./tasks/fetch-github");
const fetchRemote = require("./tasks/fetch-remote");

const GithubJobs = new CronJob(
  "*/1 * * * *",
  fetchGithub,
  null,
  true,
  "America/Los_Angeles"
);
GithubJobs.start();

const RemoteJobs = new CronJob(
  "*/1 * * * *",
  fetchRemote,
  null,
  true,
  "America/Los_Angeles"
);

GithubJobs.start();
RemoteJobs.start();
