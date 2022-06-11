import React, { Component } from "react";
import { Chart as DiceChart } from "chart.js";
import PropTypes from "prop-types";

const chartSettings = {
  labels: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  datasets: [
    {
      label: "# of Dice Rolls",
      backgroundColor: "rgba(114,166,202,0.4)",
      borderColor: "rgba(114,166,202,.8)",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ],
};

const config = {
  type: "bar",
  data: chartSettings,
  options: {
    tooltipTemplate: "Total:",
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            stepSize: 1,
          },
        },
      ],
    },
  },
};

class Chart extends Component {
  initChart = () => {
    const data = this.props.data;
    let ctx = document.getElementById("chart");
    chartSettings.datasets[0].data = data;
    this.lineChart = new DiceChart(ctx, config);
  };

  componentDidMount() {
    this.initChart();
  }

  componentDidUpdate() {
    this.lineChart.update();
  }

  componentWillUnmount() {
    this.lineChart.destroy();
  }

  render() {
    return (
      <canvas id="chart" style={{ maxHeight: "50vh", padding: "5px" }}></canvas>
    );
  }
}

export default Chart;

Chart.propTypes = {
  data: PropTypes.array,
  chartId: PropTypes.number,
};
