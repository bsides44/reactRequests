import React, { useState, useEffect } from 'react';
import { Page, Card, Grid, List, Avatar } from "tabler-react";
import './App.css';
import { getAllReactData } from './api.js'
import Detailed from './Detailed'
import Snapshot from './Snapshot'
import { checkDateIsToday, toggleChevronUp, toggleChevronDown } from "./tools"
import betty from './img/betty.jpg'

function App() {
  const [pullsData, setPullsData] = useState(0);
  const [totalNewPulls, setTotalNewPulls] = useState(0);
  const [totalClosedPulls, setTotalClosedPulls] = useState(0);
  const [totalOpenPulls, setTotalOpenPulls] = useState(0);
  const [coreTeamPulls, setCoreTeamPulls] = useState(0);
  const [showDetailed, setShowDetailed] = useState(0);

  useEffect(() => {
    getAllReactData(onSuccess)
    setShowDetailed(false)
  }, []);

  const onSuccess = (data) => {
    setTotalNewPulls(data.filter(pull => checkDateIsToday(pull.created_at)).length)
    setTotalClosedPulls(data.filter(pull => checkDateIsToday(pull.closed_at)).length)
    setTotalOpenPulls(data.filter(pull => pull.closed_at === null).length)
    setCoreTeamPulls(data.filter(pull => pull.labels.some(labelItem => {
      if (labelItem.name === "React Core Team") pull.isCore = true
      return labelItem.name === "React Core Team"
    })))
    setPullsData(data.sort((a, b) => !!b.isCore - !!a.isCore))
  }

  const toggleChevron = () => {
    if (showDetailed === false) {
      toggleChevronUp()
      goToDetailed()
    }
    else toggleChevronDown()
    return setShowDetailed(!showDetailed)
  };

  const goToSnapshot = () => {
    const snapshotButton = document.getElementById('goToSnapshot')
    snapshotButton.classList.add('active')
    const detailedButton = document.getElementById('goToDetailed')
    detailedButton.classList.remove('active')
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    setShowDetailed(false)
  }

  const goToDetailed = () => {
    const detailedButton = document.getElementById('goToDetailed')
    detailedButton.classList.add('active')
    const snapshotButton = document.getElementById('goToSnapshot')
    snapshotButton.classList.remove('active')
    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" })
    setShowDetailed(true)
  }

  return (
    <div className="App" >
      <Page.Content className="bg-block">
        <div style={{ backgroundColor: "white" }} className="p-5">
          <Grid.Row>
            <Grid.Col md={3}>
              <h1 className="mb-5">Hello Betty</h1>
              <Avatar
                size={"xl"}
                imageURL={betty}
                className="mb-5"
              />
              <div>
                <List.Group transparent={true} className="mt-2">
                  <List.GroupItem
                    id="goToSnapshot"
                    className="d-flex align-items-center"
                    active
                    onClick={() => goToSnapshot()}
                    icon="pie-chart"
                  >
                    Snapshot
                    </List.GroupItem>
                  <List.GroupItem
                    id="goToDetailed"
                    onClick={() => goToDetailed()}
                    className="d-flex align-items-center"
                    icon="server"
                  >
                    Detailed
                  </List.GroupItem>
                </List.Group>
              </div>
            </Grid.Col>
            <Grid.Col>
              <Snapshot
                pullsData={pullsData}
                totalNewPulls={totalNewPulls}
                totalClosedPulls={totalClosedPulls}
                totalOpenPulls={totalOpenPulls}
                coreTeamPulls={coreTeamPulls}
              />
              <Card id={"detailed"}>
                <Card.Header>
                  <Card.Title>Detailed</Card.Title>
                  <Card.Options>
                    <Card.OptionsItem
                      onClick={() => toggleChevron()}
                      className="icon fe fe-chevron-down"
                    />
                  </Card.Options>
                </Card.Header>
                <Card.Body>
                  {showDetailed &&
                    <Detailed
                      pullsData={pullsData}
                      totalOpenPulls={totalOpenPulls}
                      coreTeamPulls={coreTeamPulls} />
                  }
                </Card.Body>
              </Card>
            </Grid.Col>
          </Grid.Row>
        </div>
      </Page.Content>
    </div >
  );
}

export default App;
