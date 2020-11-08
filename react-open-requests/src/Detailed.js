import React from 'react';
import './App.css';
import { calculateTimeToNow } from './tools'
import { Grid, Card } from "tabler-react";

const Detailed = (props) => {
  const { pullsData, coreTeamPulls, totalOpenPulls } = props;

  return (
    <div>
      <p><b>
        Total React Core Team Pull Requests:
        <span style={{ color: "#477ee2", marginLeft: "5px" }}>
          {coreTeamPulls ?
            coreTeamPulls.length
            : 0}
        </span>
      </b></p>
      <p>
        {Math.round(coreTeamPulls.length ?
          (coreTeamPulls.length / totalOpenPulls) * 100
          : 0)}% of total
      </p>
      <Grid.Row>
        {/* Render each PR as a card */}
        {pullsData ?
          pullsData.map((pull, i) => {
            if (pull.closed_at === null) {
              // format dates
              const event = new Date(pull.created_at)
              const eventOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour12: true }
              const durationString = calculateTimeToNow(event)

              return <Grid.Col key={i} className={"col-12 col-md-6 col-lg-4"}>
                {/* Change color of Core Team cards */}
                <Card id="detailCard" title={pull.title} style={{ backgroundColor: pull.isCore ? "#89ABE9" : "" }}>
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
      <p><b>Total Other Pull Requests:
        <span style={{ color: "89ABE9", marginLeft: "5px" }}>
          {totalOpenPulls ?
            totalOpenPulls - coreTeamPulls.length
            : 0}
        </span>
      </b></p>
      <p>
        {Math.round(coreTeamPulls.length ?
          ((totalOpenPulls - coreTeamPulls.length) / totalOpenPulls) * 100
          : 0)}% of total
      </p>
    </div>
  );
}

export default Detailed;
