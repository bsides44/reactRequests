import React from 'react';
import './App.css';
import ProportionChart from './ProportionChart'
import { calculateAvOpenTime } from './tools'
import { Grid, Card, Dimmer, StampCard } from "tabler-react";

const Snapshot = (props) => {
  const { pullsData, totalOpenPulls, totalNewPulls, coreTeamPulls } = props;

  const averageTime = pullsData ? calculateAvOpenTime(pullsData) : null
  return (
    <Grid.Row>
      <Grid.Col >
        <Grid.Row>
          {/* Badges  */}
          <Grid.Col className={"col-6"}>
            <StampCard
              color="teal"
              icon="inbox"
              header={totalOpenPulls ? totalOpenPulls : "0"}
              footer={"Open Pull Requests"}
            />
          </Grid.Col>
          <Grid.Col className={"col-6"}>
            <StampCard
              color="yellow"
              icon="flag"
              header={totalNewPulls ? totalNewPulls : "0"}
              footer={"New Pull Requests"}
            />
          </Grid.Col>
        </Grid.Row>

        {/* Average open time  */}
        <Grid.Row>
          <Grid.Col className={"col-12"}>
            <Card title={"Average open time"}>
              <Card.Body className={"m-0 responsive-h1"}>
                {averageTime ? averageTime.map((piece, i) =>
                  <h1 key={i}>{piece}{i === averageTime.length - 1 ? "" : ","}</h1>
                ) :
                  <Dimmer active loader><div style={{ height: "60px" }}></div></Dimmer>
                }
              </Card.Body>
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Grid.Col>

      {/* Pie chart  */}
      <Grid.Col className={"col-12 col-md-6"}>
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
