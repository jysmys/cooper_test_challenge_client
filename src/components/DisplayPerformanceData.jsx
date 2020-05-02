import React, { Component } from "react";
import { getData } from "../modules/performanceData";
import { Doughnut } from "react-chartjs-2";

class DisplayPerformanceData extends Component {
  state = {
    performanceData: null,
    data: [],
  };
  componentDidMount() {
    this.getPerformanceData();
  }
  componentDidUpdate(prevProps) {
    if (this.props.updateIndex !== prevProps.updateIndex) {
      this.getPerformanceData();
    }
  }
  async getPerformanceData() {
    let result = await getData();
    this.setState({ performanceData: result.data.entries }, () => {
      this.props.indexUpdated();
    });
    let data = [];
    this.state.performanceData.map((item) => {
      switch (item.data.message) {
        case "Poor":
          data.push(1);
          break;
        case "Below average":
          data.push(2);
          break;
        case "Average":
          data.push(3);
          break;
        case "Above average":
          data.push(4);
          break;
        case "Excellent":
          data.push(5);
          break;
      }
    });
    this.setState({ data: data });
  }
  render() {
    const chartdata = {
      labels: [
        "Poor",
        "Below average",
        "Average",
        "Above average",
        "Excellent",
      ],
      datasets: [
        {
          label: "Performance Data",
          backgroundColor: [
            "#B21F00",
            "#C9DE00",
            "#2FDE00",
            "#00A6B4",
            "#6800B4",
          ],
          hoverBackgroundColor: [
            "#501800",
            "#4B5000",
            "#175000",
            "#003350",
            "#35014F",
          ],
          data: this.state.data,
        },
      ],
    };

    return (
      <Doughnut
        data={chartdata}
        options={{
          title: {
            display: true,
            text: "Performance Data",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "bottom",
          },
        }}
      />
    );
  }
}
export default DisplayPerformanceData;
