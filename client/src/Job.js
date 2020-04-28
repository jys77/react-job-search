import React from "react";
import Typography from "@material-ui/core/Typography";
const job = ({ job, clicked }) => {
  return (
    <div className="Job" onClick={clicked}>
      <div className="CardLeft">
        <Typography variant="h6">{job.title}</Typography>
        <Typography variant="h5">{job.company}</Typography>
        <Typography variant="h6">{job.location}</Typography>
      </div>
      <div>
        <Typography>
          {job.created_at.split(" ").slice(0, 3).join(" ")}
        </Typography>
      </div>
    </div>
  );
};
export default job;
