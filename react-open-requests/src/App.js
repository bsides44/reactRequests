import React, { useState, useEffect } from 'react';
import { getAllReactData } from './api.js'
import './App.css';
import { calculateTimeToNow } from './tools'


function App() {
  const [pullsData, setPullsData] = useState(0);
  const [totalPulls, setTotalPulls] = useState(0);
  const [totalCoreTeamPulls, setTotalCoreTeamPulls] = useState(0);

  useEffect(() => {
    getAllReactData(onSuccess)
  }, []);

  const onSuccess = (data) => {
    setPullsData(data)
    setTotalPulls(data.filter(pull => pull.closed_at === null).length)
    let pullLabels = []
    data.forEach(pull => pull.labels.forEach(labelItem => pullLabels.push(labelItem)))
    setTotalCoreTeamPulls(pullLabels.filter(labelItem => labelItem.name === "React Core Team").length)
  }

  return (
    < div className="App" >
      <p><b>Total open Pull Requests: {totalPulls}</b></p>
      {
        pullsData ?
          pullsData.map((pull, i) => {
            if (pull.closed_at === null) {
              const event = new Date(pull.closed_at)
              const eventOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour12: true }
              const durationString = calculateTimeToNow(event)

              return <div key={i}>
                <div>
                  <p>Open request:
          <a href={pull.html_url} target="_black" rel="noopener noreferrer" alt="Link to pull request">
                      {pull.id}
                    </a>
                  </p>
                  <p>Open since: {event.toLocaleString(undefined, eventOptions)}</p>
                  <p>Open for {durationString}</p>
                </div>
              </div>
            }
          }
          ) :
          <p>Loading...</p>
      }
      <p><b>Total React Core Team Pull Requests: {totalCoreTeamPulls}</b></p>
      { totalCoreTeamPulls ? (totalCoreTeamPulls / totalPulls) * 100 : 0}% of total
    </div >
  );
}

export default App;
