import React, { useEffect, useState } from 'react';
import './App.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'


const ProportionChart = (props) => {
  const { coreTeamPulls, pullsData } = props
  const [proportionCorePulls, setProportionCorePulls] = useState(0);
  const [proportionPulls, setProportionPulls] = useState(0);
  const [placeholderOptions] = useState({
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
        fontSize: "14",
        whiteSpace: "nowrap",
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
        animation: {
          defer: 10
        }
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
        selected: true
      },
      {
        name: "Other",
        color: "#d8d8d8",
        y: 100,
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
  const [options, setOptions] = useState({
    chart: {
      type: "pie",
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      height: 265,
      margin: [0, 0, 0, 0],
      spacingTop: 0,
      spacingBottom: 0,
      spacingLeft: 0,
      spacingRight: 0,
      style: {
        fontFamily: "Helvetica Neue",
      },
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
        fontSize: "14",
        whiteSpace: "nowrap",
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
          description: "Pie chart denoting proportion of requests from React Core Team",
          enabled: true,
          exposeAsGroupOnly: false,
        },
        animation: {
          defer: 10
        }
      },
    },
    xAxis: {
      visible: false
    },
    yAxis: {
      visible: false
    },
    series: [{
      data: [{
        name: "React Core Team",
        color: "#29418D",
        y: 50,
        sliced: true,
        selected: true
      },
      {
        name: "Other requests",
        color: "#d8d8d8",
        y: 50,
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

  useEffect(() => {
    setProportionCorePulls(coreTeamPulls.length)
    setProportionPulls(pullsData.length - coreTeamPulls.length)

    setOptions({
      series: [{
        data: [{
          y: proportionCorePulls,
        },
        {
          y: proportionPulls,
        }]
      }],
    });
  }, [proportionCorePulls, proportionPulls, coreTeamPulls, pullsData]);

  return (
    <div id="proportion-chart">
      {props.pullsData ? <HighchartsReact
        highcharts={Highcharts}
        options={options}
      /> :
        <HighchartsReact
          highcharts={Highcharts}
          options={placeholderOptions}
        />}
    </div>
  );
}

export default ProportionChart;
