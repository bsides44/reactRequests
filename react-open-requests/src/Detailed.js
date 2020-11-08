import React from 'react';
import './App.css';
import { calculateTimeToNow } from './tools'
import { Grid, Card } from "tabler-react";

const Detailed = (props) => {
  const { pullsData, coreTeamPulls, totalOpenPulls } = props;

  return (
    <div>
      <p><b>Total React Core Team Pull Requests: <span style={{ color: "#477ee2" }}>{coreTeamPulls.length}</span></b></p>
      <p>{Math.round(coreTeamPulls.length ? (coreTeamPulls.length / totalOpenPulls) * 100 : 0)}% of total</p>
      <Grid.Row>
        {
          pullsData ?
            pullsData.map((pull, i) => {
              if (pull.closed_at === null) {
                const event = new Date(pull.created_at)
                const eventOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour12: true }
                const durationString = calculateTimeToNow(event)

                return <Grid.Col key={i} xl={4} md={6} sm={12}>
                  <Card title={pull.title} style={{ backgroundColor: pull.isCore ? "#89ABE9" : "" }}>
                    <Card.Body >
                      <p>Request id:  <a href={pull.html_url} target="_black" rel="noopener noreferrer" alt="Link to pull request">
                        {pull.id}
                      </a>
                      </p>
                      <p>Open since:  {event.toLocaleString(undefined, eventOptions)}</p>
                      <p>Open for  {durationString}</p>
                    </Card.Body>
                  </Card>
                </Grid.Col>
              }
              return pull
            })
            :
            <p>Loading...</p>
        }
      </Grid.Row >
      <p><b>Total Other Pull Requests: <span style={{ color: "89ABE9" }}>{totalOpenPulls ? totalOpenPulls - coreTeamPulls.length : 0}</span></b></p>
      <p>{Math.round(coreTeamPulls.length ? ((totalOpenPulls - coreTeamPulls.length) / totalOpenPulls) * 100 : 0)}% of total</p>
    </div>
  );
}

export default Detailed;
