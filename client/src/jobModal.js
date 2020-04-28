import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const JobModal = ({ job, open, handleClose }) => {
  if (!job.title) {
    return null;
  }

  if (!job.how_to_apply) {
    job.how_to_apply = "";
  }
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {job.title}
          <br></br>
          {job.company}
          <img
            className="CompanyLogo"
            src={job.company_logo}
            alt={job.company}
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            dangerouslySetInnerHTML={{
              __html: `<h3>Description</h3>${job.description}<br><h3>How to Apply</h3>${job.how_to_apply}`,
            }}
          ></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <a href={job.url} target="_blank">
            <Button color="primary">Apply</Button>
          </a>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default JobModal;
