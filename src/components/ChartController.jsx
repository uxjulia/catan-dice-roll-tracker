import React, { Component } from 'react';
import Chart from 'chart.js';

const chartSettings = { 
	labels: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    datasets: [
        {
            label: "# of Dice Rolls",
            backgroundColor: "rgba(114,166,202,0.4)",
            borderColor: "rgba(114,166,202,.8)",
            data: []
        }
     ]
 };

const config = {
    type: 'bar',
    data: chartSettings,
    options: {
        tooltipTemplate: "Total:",
        scales: {
            yAxes: [{
                ticks: {
                    min: 0,
                    stepSize: 1
                }
            }]
        }
    }
 };

class ChartController extends Component {
    initChart = () => {
        const data = this.props.data;
        let ctx = document.getElementById('chart');
        chartSettings.datasets[0].data = data;
        this.lineChart = new Chart(ctx, config);
    };
    
	componentDidMount(){
		this.initChart();
        console.log("Mounted!");
	};

    componentDidUpdate(){
        this.lineChart.update();
    }
    
    componentWillUnmount(){
        this.lineChart.destroy();
    }

    render(){
		return(
            <canvas id="chart"></canvas>
		)
	}
}

export default ChartController;