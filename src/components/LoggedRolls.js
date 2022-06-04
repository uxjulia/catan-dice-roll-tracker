import React, { Component } from "react";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import _ from "lodash";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";

const Wrapper = styled.div`
  .rolllog :first-of-type {
    color: #d54343;
    font-weight: bold;
  }

  .rolllog {
    font-size: 0.875rem;
  }
`;

class LoggedRolls extends Component {
  render() {
    const data = this.props.data;
    const tail = _.tail(data);
    const first = _.head(data);
    const style = {
      total: {
        fontSize: ".8rem",
      },
    };
    return (
      <Card variant="outlined" id="loggedRolls" className="mb-3">
        <CardContent>
          <div className="mb-1">
            <span className="text-muted" style={style.total}>
              Total Rolls: {data.length}{" "}
            </span>
          </div>
          <Wrapper>
            <Typography mr={1} variant="body2" component="span">
              Last Roll:
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
              <span className="rolllog">
                <span>{first}, </span>
                <span>{_.join(tail, ", ")}</span>
              </span>
            )}
          </Wrapper>
        </CardContent>
      </Card>
    );
  }
}

export default LoggedRolls;

LoggedRolls.propTypes = {
  data: PropTypes.array,
};
