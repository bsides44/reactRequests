import React, { useEffect, useState } from 'react';
import './App.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'


const ProportionChart = (props) => {
  const [proportionCorePulls, setProportionCorePulls] = useState(0);
  const [proportionPulls, setProportionPulls] = useState(0);
  const [placeholderOptions, setPlaceholderOptions] = useState({
    chart: {
      type: "pie",
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      style: {
        fontFamily: "Helvetica Neue",
      },
      marginRight: 40,
      spacingLeft: 0,
      spacingRight: 0,
      spacingBottom: 30,
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
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [{
      data: [{
        name: "React Core Team",
        color: "#62c0cd",
        y: 0,
        sliced: true,
        selected: true
      },
      {
        name: "Total Pull Requests",
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
      style: {
        fontFamily: "Helvetica Neue",
      },
      marginRight: 40,
      spacingLeft: 0,
      spacingRight: 0,
      spacingBottom: 30,
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
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [{
      data: [{
        name: "React Core Team",
        color: "#62c0cd",
        y: 50,
        sliced: true,
        selected: true
      },
      {
        name: "Total Pull Requests",
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
    const core = props.coreTeamPulls
    const pull = props.pullsData
    setProportionCorePulls((core.length / pull.length) * 100)
    setProportionPulls(100 - ((core.length / pull.length) * 100))

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
  }, [proportionCorePulls, proportionPulls, props.coreTeamPulls, props.pullsData]);

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
