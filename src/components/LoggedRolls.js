import React, { Component } from "react";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import _ from "lodash";
import PropTypes from "prop-types";

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
          <div className="mb-3">
            <span className="text-muted" style={style.total}>
              Total Rolls: {data.length}{" "}
            </span>
          </div>
          <div>
            <span>Last Roll: </span>
            {!data.length && <span className="text-muted">No rolls yet</span>}
            {data.length <= 1 && <span>{_.join(data, ", ")}</span>}
            {data.length > 1 && (
              <span className="rolllog">
                <span>{first}, </span>
                <span>{_.join(tail, ", ")}</span>
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default LoggedRolls;

LoggedRolls.propTypes = {
  data: PropTypes.array,
};
