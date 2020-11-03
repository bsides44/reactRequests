import React from 'react';
import './App.css';
import ProportionChart from './ProportionChart'
import { calculateAvOpenTime } from './tools'
import { Grid, Card } from "tabler-react";

const Snapshot = (props) => {
  const averageTime = props.pullsData ? calculateAvOpenTime(props.pullsData) : null
  return (
    <Grid.Row>
      <Grid.Col md={6} xl={4}>
        <Card title={"Total Open Pull Requests"}>
          <Card.Body style={{ fontSize: 80, color: "orange" }}>
            {props.totalOpenPulls}
          </Card.Body>
        </Card>
      </Grid.Col>
      <Grid.Col md={6} xl={4}>
        <Card title={"Average open time"}>
          <Card.Body style={{ fontSize: 40, color: "#FF6356" }}>
            {averageTime ? averageTime.map((piece, i) => <p key={i}>{piece}{i === averageTime.length - 1 ? "" : ","}</p>) : "Loading..."}
          </Card.Body>
        </Card>
      </Grid.Col>
      <Grid.Col md={6} xl={4}>
        <Card title={"Proportion of React Core Team requests"}>
          <Card.Body style={{ fontSize: 80, color: "orange" }}>
            <ProportionChart
              coreTeamPulls={props.coreTeamPulls}
              pullsData={props.pullsData}
            />
          </Card.Body>
        </Card>
      </Grid.Col>
    </Grid.Row>
  );
}

export default Snapshot;
