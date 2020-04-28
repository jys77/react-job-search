import React, { useEffect, useState } from "react";
import "./App.css";
import Jobs from "./Jobs";
import JobTab from "./JobTab";

const GitHub_Jobs_API = "/api/jobs/github";
const RemoteOK_Jobs_API = "/api/jobs/remoteok";

const fetchGithubJobs = async (updateCallback) => {
  const res = await fetch(GitHub_Jobs_API);
  const githubJobs = await res.json();
  updateCallback(githubJobs);
  console.log({ githubJobs });
};

const fetchRemoteJobs = async (updateCallback) => {
  const res = await fetch(RemoteOK_Jobs_API);
  const remoteJobs = await res.json();
  updateCallback(remoteJobs);
  console.log({ remoteJobs });
};

function App() {
  const [GithubJobList, setGithubJobList] = useState([]);
  const [RemoteJobList, setRemoteJobList] = useState([]);

  useEffect(() => {
    fetchGithubJobs(setGithubJobList);
  }, []);

  useEffect(() => {
    fetchRemoteJobs(setRemoteJobList);
  }, []);

  return (
    <div className="App">
      <JobTab githubJobs={GithubJobList} remoteJobs={RemoteJobList} />
    </div>
  );
}

export default App;
