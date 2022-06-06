import React from "react";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/pro-solid-svg-icons";
import ResourceInput from "./ResourceInput";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ResourceTracker = ({
  open = false,
  handleVisibility,
  onChange,
  resources,
}) => {
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={() => handleVisibility(false)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => handleVisibility(false)}
              aria-label="close"
            >
              <FontAwesomeIcon icon={faXmark} />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Resource Tracker
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="container-sm my-4">
          <div className="row">
            <div className="col-sm-12">
              <div className="align-items-center">
                <ResourceInput
                  onChange={onChange}
                  value={resources[1][0]}
                  tileValue="1"
                />
                <ResourceInput
                  onChange={onChange}
                  value={resources[2][0]}
                  tileValue="2"
                />
                <ResourceInput
                  onChange={onChange}
                  value={resources[3][0]}
                  tileValue="3"
                />
                <ResourceInput
                  onChange={onChange}
                  value={resources[3][1]}
                  tileValue="3"
                />
                <ResourceInput
                  onChange={onChange}
                  value={resources[4][0]}
                  tileValue="4"
                />
                <ResourceInput
                  onChange={onChange}
                  value={resources[4][1]}
                  tileValue="4"
                />
                <ResourceInput
                  onChange={onChange}
                  value={resources[5][0]}
                  tileValue="5"
                />
                <ResourceInput
                  onChange={onChange}
                  value={resources[5][1]}
                  tileValue="5"
                />
                <ResourceInput
                  onChange={onChange}
                  value={resources[6][0]}
                  tileValue="6"
                  color="#C53437"
                />
                <ResourceInput
                  onChange={onChange}
                  value={resources[6][1]}
                  tileValue="6"
                  color="#C53437"
                />
                <ResourceInput
                  onChange={onChange}
                  value={resources[8][0]}
                  tileValue="8"
                  color="#C53437"
                />
                <ResourceInput
                  onChange={onChange}
                  value={resources[8][1]}
                  tileValue="8"
                  color="#C53437"
                />
                <ResourceInput
                  onChange={onChange}
                  value={resources[9][0]}
                  tileValue="9"
                />
                <ResourceInput
                  onChange={onChange}
                  value={resources[9][1]}
                  tileValue="9"
                />
                <ResourceInput
                  onChange={onChange}
                  value={resources[10][0]}
                  tileValue="10"
                />
                <ResourceInput
                  onChange={onChange}
                  value={resources[10][1]}
                  tileValue="10"
                />
                <ResourceInput
                  onChange={onChange}
                  value={resources[11][0]}
                  tileValue="11"
                />
                <ResourceInput
                  onChange={onChange}
                  value={resources[12][0]}
                  tileValue="12"
                />
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ResourceTracker;

ResourceTracker.propTypes = {
  resources: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleVisibility: PropTypes.func.isRequired,
  onChange: PropTypes.func,
};
