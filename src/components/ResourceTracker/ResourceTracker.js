import React from "react";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCircleQuestion } from "@fortawesome/pro-solid-svg-icons";
import ResourceInput from "./ResourceInput";
import Box from "@mui/material/Box";

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
        <AppBar sx={{ position: "fixed", top: "0", left: "0", right: "0" }}>
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
              Track Resources
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="container-sm mb-2" style={{ marginTop: "60px" }}>
          <div className="row">
            <div className="col-sm-12">
              <Box mt={4} mb={4}>
                <Typography align="center">
                  <FontAwesomeIcon
                    icon={faCircleQuestion}
                    className="me-2"
                    color="#555"
                  />
                  Enter the corresponding resource for each number tile to
                  display the resource when dice rolls are logged.
                </Typography>
              </Box>
              <form className="align-items-center">
                <ResourceInput
                  dataId="1"
                  onChange={onChange}
                  value={resources[2][1]}
                  tileValue="2"
                />
                <hr />
                <ResourceInput
                  dataId="1"
                  onChange={onChange}
                  value={resources[3][1]}
                  tileValue="3"
                  rarity={2}
                />
                <ResourceInput
                  dataId="2"
                  onChange={onChange}
                  value={resources[3][2]}
                  tileValue="3"
                  rarity={2}
                />
                <hr />
                <ResourceInput
                  dataId="1"
                  onChange={onChange}
                  value={resources[4][1]}
                  tileValue="4"
                  rarity={3}
                />
                <ResourceInput
                  dataId="2"
                  onChange={onChange}
                  value={resources[4][2]}
                  tileValue="4"
                  rarity={3}
                />
                <hr />
                <ResourceInput
                  dataId="1"
                  onChange={onChange}
                  value={resources[5][1]}
                  tileValue="5"
                  rarity={4}
                />
                <ResourceInput
                  dataId="2"
                  onChange={onChange}
                  value={resources[5][2]}
                  tileValue="5"
                  rarity={4}
                />
                <hr />
                <ResourceInput
                  dataId="1"
                  onChange={onChange}
                  value={resources[6][1]}
                  tileValue="6"
                  color="#C53437"
                  rarity={5}
                />
                <ResourceInput
                  dataId="2"
                  onChange={onChange}
                  value={resources[6][2]}
                  tileValue="6"
                  color="#C53437"
                  rarity={5}
                />
                <hr />
                <ResourceInput
                  dataId="1"
                  onChange={onChange}
                  value={resources[8][1]}
                  tileValue="8"
                  color="#C53437"
                  rarity={5}
                />
                <ResourceInput
                  dataId="2"
                  onChange={onChange}
                  value={resources[8][2]}
                  tileValue="8"
                  color="#C53437"
                  rarity={5}
                />
                <hr />
                <ResourceInput
                  dataId="1"
                  onChange={onChange}
                  value={resources[9][1]}
                  tileValue="9"
                  rarity={4}
                />
                <ResourceInput
                  dataId="2"
                  onChange={onChange}
                  value={resources[9][2]}
                  tileValue="9"
                  rarity={4}
                />
                <hr />
                <ResourceInput
                  dataId="1"
                  onChange={onChange}
                  value={resources[10][1]}
                  tileValue="10"
                  rarity={3}
                />
                <ResourceInput
                  dataId="2"
                  onChange={onChange}
                  value={resources[10][2]}
                  tileValue="10"
                  rarity={3}
                />
                <hr />
                <ResourceInput
                  dataId="1"
                  onChange={onChange}
                  value={resources[11][1]}
                  tileValue="11"
                  rarity={2}
                />
                <ResourceInput
                  dataId="2"
                  onChange={onChange}
                  value={resources[11][2]}
                  tileValue="11"
                  rarity={2}
                />
                <hr />
                <ResourceInput
                  dataId="1"
                  onChange={onChange}
                  value={resources[12][1]}
                  tileValue="12"
                  rarity={1}
                />
              </form>
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
