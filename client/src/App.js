import React, { useEffect, useState } from "react";
import "./App.css";
import Jobs from "./Jobs";

const JOB_API_URL = "/api/jobs";

const fetchJobs = async (updateCallback) => {
  const res = await fetch(JOB_API_URL);
  const json = await res.json();
  updateCallback(json);
  console.log({ json });
};

function App() {
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    fetchJobs(setJobList);
  }, []);
  return (
    <div className="App">
      <Jobs jobs={jobList} />
    </div>
  );
}

export default App;
