import React from 'react';
import './App.css';
import { calculateTimeToNow } from './tools'
import { Grid, Card } from "tabler-react";

const Detailed = (props) => {

  return (
    <Grid.Row>
      {
        props.pullsData ?
          props.pullsData.map((pull, i) => {
            if (pull.closed_at === null) {
              const event = new Date(pull.created_at)
              const eventOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour12: true }
              const durationString = calculateTimeToNow(event)

              return <Grid.Col key={i} md={6} xl={4}>
                <Card title={pull.title} style={{ backgroundColor: pull.isCore ? "#FFE1DD" : "" }}>
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
          }
          ) :
          <p>Loading...</p>
      }
    </Grid.Row>
  );
}

export default Detailed;
