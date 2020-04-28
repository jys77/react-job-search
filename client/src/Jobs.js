import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

import Job from "./Job";
import JobModal from "./jobModal";

const Jobs = ({ jobs }) => {
  //modal
  const [open, setOpen] = React.useState(false);
  const [selectedJob, setSelectedJob] = React.useState({});
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //pagination
  const numJobs = jobs.length;
  const steps = Math.ceil(numJobs / 20);
  const [activeStep, setActiveStep] = useState(0);

  const toTop = () => {
    const gotoTop = () => {
      let currentPosition =
        document.documentElement.scrollTop || document.body.scrollTop;
      currentPosition -= 10;
      if (currentPosition > 0) {
        window.scrollTo(0, currentPosition);
      } else {
        window.scrollTo(0, 0);
        clearInterval(timer);
        timer = null;
      }
    };
    var timer = setInterval(gotoTop, 1);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    toTop();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    toTop();
  };

  const jobsOnPage = jobs.slice(activeStep * 20, activeStep * 20 + 20);
  return (
    <div className="Jobs">
      <JobModal open={open} job={selectedJob} handleClose={handleClose} />
      <Typography variant="h4" component="h1">
        Entry Level Software Jobs
      </Typography>
      <Typography variant="h6" component="h1">
        Found {numJobs} jobs.
      </Typography>
      {jobsOnPage.map((job, i) => (
        <Job
          key={i}
          job={job}
          clicked={() => {
            setSelectedJob(job);
            handleClickOpen();
          }}
        />
      ))}
      <div>
        Page {activeStep + 1} of {steps}
      </div>
      <MobileStepper
        style={{
          width: "60%",
          margin: "0 auto",
        }}
        variant="progress"
        steps={steps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === steps - 1}
          >
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </div>
  );
};
export default Jobs;
