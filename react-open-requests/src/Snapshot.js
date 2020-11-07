import React from 'react';
import './App.css';
import ProportionChart from './ProportionChart'
import { calculateAvOpenTime } from './tools'
import { Grid, Card, StampCard } from "tabler-react";

const Snapshot = (props) => {
  const { pullsData, totalOpenPulls, totalNewPulls, coreTeamPulls, totalClosedPulls } = props;

  const averageTime = pullsData ? calculateAvOpenTime(pullsData) : null
  return (
    <Grid.Row>
      <Grid.Col md={8} xl={8}>
        <Grid.Row>
          <Grid.Col md={6} xl={6}>
            <StampCard
              color="teal"
              icon="dollar-sign"
              header={totalOpenPulls ? totalOpenPulls : "0"}
              footer={"Open PRs"}
            />
          </Grid.Col>
          <Grid.Col md={6} xl={6}>
            <StampCard
              color="yellow"
              icon="dollar-sign"
              header={totalNewPulls ? totalNewPulls : "0"}
              footer={"New PRs"}
            />
          </Grid.Col>
        </Grid.Row>

        <Grid.Row>
          <Grid.Col md={12} xl={12}>
            <Card title={"Average open time"}>
              <Card.Body className={"m-0"}>
                {averageTime ? averageTime.map((piece, i) => <h1 key={i}>{piece}{i === averageTime.length - 1 ? "" : ","}</h1>) : <p>"Loading..."</p>}
              </Card.Body>
            </Card>
          </Grid.Col>

        </Grid.Row>
      </Grid.Col>

      <Grid.Col md={4} xl={4}>
        <Card title={"Proportion of React Core Team requests"}>
          <Card.Body style={{ fontSize: 80, color: "orange" }}>
            <ProportionChart
              pullsData={pullsData}
              coreTeamPulls={coreTeamPulls}
            />
          </Card.Body>
        </Card>
      </Grid.Col>

    </Grid.Row>
  );
}

export default Snapshot;
