import React, { useState, useEffect } from 'react';
import './App.css';
import Detailed from './Detailed'
import Snapshot from './Snapshot'
import { getAllReactData } from './api.js'
import { Page } from "tabler-react";


function App() {
  const [pullsData, setPullsData] = useState(0);
  const [totalOpenPulls, setTotalOpenPulls] = useState(0);
  const [coreTeamPulls, setCoreTeamPulls] = useState(0);

  useEffect(() => {
    getAllReactData(onSuccess)
  }, []);

  const onSuccess = (data) => {
    setTotalOpenPulls(data.filter(pull => pull.closed_at === null).length)
    setCoreTeamPulls(data.filter(pull => pull.labels.some(labelItem => {
      if (labelItem.name === "React Core Team") pull.isCore = true
      return labelItem.name === "React Core Team"
    })))
    setPullsData(data.sort((a, b) => !!a.isCore - !!b.isCore))
  }

  return (
    <div className="App" >
      <Page.Content>

        <Snapshot
          pullsData={pullsData}
          totalOpenPulls={totalOpenPulls}
          coreTeamPulls={coreTeamPulls}
        />
        <p><b>Detailed</b></p>
        <Detailed
          pullsData={pullsData} />
        <p><b>Total React Core Team Pull Requests: {coreTeamPulls.length}</b></p>
        {coreTeamPulls.length ? (coreTeamPulls.length / totalOpenPulls) * 100 : 0}% of total
      </Page.Content>
    </div >
  );
}

export default App;
