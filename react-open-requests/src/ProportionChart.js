import React, { useEffect, useState } from 'react';
import './App.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'

const ProportionChart = (props) => {
  const { coreTeamPulls, pullsData } = props
  const [proportionCorePulls, setProportionCorePulls] = useState(0);
  const [proportionPulls, setProportionPulls] = useState(0);
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "pie",
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      height: 265,
      style: {
        fontFamily: "Helvetica Neue",
      },
      margin: [0, 0, 0, 0],
      spacingTop: 0,
      spacingBottom: 0,
      spacingLeft: 0,
      spacingRight: 0
    },
    title: {
      text: "",
      style: {
        fontSize: 14,
      },
    },
    credits: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    tooltip: {
      borderColor: "none",
      style: {
        color: "#333333",
        whiteSpace: "normal",
      },
      headerFormat: `<span style="font-size: "14px"">{point.key}:</span>`,
      pointFormatter: function () {
        const request = this.y > 1 ? "requests" : "request"
        return `<span><br/>${this.y} ${request}</span>`
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        size: '100%',
        dataLabels: {
          enabled: false,
        },
        accessibility: {
          description: "Pie chart denoting proportion of requests from React Core Team requests",
          enabled: true,
          exposeAsGroupOnly: false,
          pointDescriptionFormatter: undefined,
        },
      },
    },
    xAxis: {
      visible: false,
      minPadding: 0,
      maxPadding: 0
    },
    yAxis: {
      visible: false,
      minPadding: 0,
      maxPadding: 0
    },
    series: [{
      data: [{
        name: "React Core Team",
        color: "#29418D",
        y: 0,
        sliced: true,
      },
      {
        name: "Other",
        color: "#A0A0A0",
        y: 1,
        selected: true
      }]
    }],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 400,
          },
          chartOptions: {
          },
        },
      ],
    },
  });

  // render placeholder chart while data loads
  // then update chart values to reflect loaded data
  useEffect(() => {
    if (pullsData) {
      setProportionCorePulls(coreTeamPulls.length)
      setProportionPulls(pullsData.length - coreTeamPulls.length)

      setChartOptions({
        series: [{
          data: [{
            y: proportionCorePulls,
          },
          {
            y: proportionPulls,
          }]
        }],
      });
    }

  }, [pullsData, proportionCorePulls, proportionPulls]);

  return (
    <div id="proportion-chart">
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
      />
    </div>
  );
}

export default ProportionChart;
