import React from "react";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const ConfirmationDialog = ({
  open = false,
  handleVisibility,
  handleConfirm,
}) => {
  return (
    <div>
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
        maxWidth="xs"
        open={open}
      >
        <DialogTitle>Start New Game?</DialogTitle>
        <DialogContent dividers>
          <Typography>All logged rolls will be cleared.</Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => handleVisibility(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmationDialog;

ConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  handleVisibility: PropTypes.func.isRequired,
};
