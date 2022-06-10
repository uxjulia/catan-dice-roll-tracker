import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import _ from "lodash";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";

const Wrapper = styled.div`
  .rolllog :first-of-type {
    color: #d54343;
    font-weight: bold;
  }
  font-size: 0.875rem;
  text-transform: capitalize;
`;

const LoggedRolls = ({
  state,
  resourceLog = false,
  data,
  highlight = true,
  totalText = "Total Rolls",
  lastText = "Last Roll",
}) => {
  return (
    <Card variant="outlined" id="loggedRolls" className="mb-2">
      {resourceLog && data.length === 0 ? (
        <Box p={1}>
          <Typography variant="body2" className="text-muted">
            <a
              href="#"
              role="button"
              onClick={() => state.handleResourceTrackerVisibility(true)}
            >
              Enter Resources
            </a>{" "}
            to see them logged here.
          </Typography>
        </Box>
      ) : (
        <Box p={2}>
          <Box className="mb-1">
            <Typography className="text-muted" component="span" variant="body2">
              {totalText}: {data.length}{" "}
            </Typography>
          </Box>
          <Wrapper>
            <Typography mr={1} variant="body2" component="span">
              {lastText}:
            </Typography>
            {!data.length && (
              <Typography
                className="text-muted"
                variant="body2"
                component="span"
              >
                No rolls yet
              </Typography>
            )}
            {data.length <= 1 && (
              <Typography mr={1} variant="body2" component="span">
                {_.join(data, ", ")}
              </Typography>
            )}
            {data.length > 1 && (
              <span className={`${highlight ? "rolllog" : null}`}>
                <span>{_.head(data)}, </span>
                <span>{_.join(_.tail(data), ", ")}</span>
              </span>
            )}
          </Wrapper>
        </Box>
      )}
    </Card>
  );
};

export default LoggedRolls;

LoggedRolls.propTypes = {
  state: PropTypes.object,
  data: PropTypes.array,
  highlight: PropTypes.bool,
  totalText: PropTypes.string,
  lastText: PropTypes.string,
  resourceLog: PropTypes.bool,
};
