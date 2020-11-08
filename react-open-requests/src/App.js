import React, { useState, useEffect } from 'react';
import Detailed from './Detailed'
import Snapshot from './Snapshot'
import { Page, Card, Grid, List, Avatar } from "tabler-react";
import { getAllReactData } from './api.js'
import { checkDateIsToday, toggleChevronUp, toggleChevronDown } from "./tools"
import betty from './img/betty.jpg'

function App() {
  const [pullsData, setPullsData] = useState(0);
  const [totalNewPulls, setTotalNewPulls] = useState(0);
  const [totalClosedPulls, setTotalClosedPulls] = useState(0);
  const [totalOpenPulls, setTotalOpenPulls] = useState(0);
  const [coreTeamPulls, setCoreTeamPulls] = useState(0);
  const [showDetailed, setShowDetailed] = useState(0);

  // get data on mount
  useEffect(() => {
    getAllReactData(onSuccess)
    setShowDetailed(false)
  }, []);

  // once we have the data, calculate values
  const onSuccess = (data) => {
    setTotalNewPulls(data.filter(pull => checkDateIsToday(pull.created_at)).length)
    setTotalClosedPulls(data.filter(pull => checkDateIsToday(pull.closed_at)).length)
    setTotalOpenPulls(data.filter(pull => pull.closed_at === null).length)
    setCoreTeamPulls(data.filter(pull => pull.labels.some(labelItem => {
      if (labelItem.name === "React Core Team") pull.isCore = true
      return labelItem.name === "React Core Team"
    })))
    // put React Core Team pulls first
    setPullsData(data.sort((a, b) => !!b.isCore - !!a.isCore))
  }

  // opening and closing the 'details' section
  const toggleChevron = () => {
    if (showDetailed === false) {
      toggleChevronDown()
    }
    else toggleChevronUp()
    return setShowDetailed(!showDetailed)
  };

  // side menu navigation actions
  const goToSnapshot = () => {
    const snapshotButton = document.getElementById('goToSnapshot')
    snapshotButton.classList.add('active')
    const detailedButton = document.getElementById('goToDetailed')
    detailedButton.classList.remove('active')
    const snapshotDiv = document.getElementById('snapshot')
    snapshotDiv.scrollIntoView({ behavior: "smooth" })
    setShowDetailed(false)
    toggleChevronUp()
  }

  const goToDetailed = () => {
    const detailedButton = document.getElementById('goToDetailed')
    detailedButton.classList.add('active')
    const snapshotButton = document.getElementById('goToSnapshot')
    snapshotButton.classList.remove('active')
    const detailDiv = document.getElementById('detailed')
    detailDiv.scrollIntoView({ behavior: "smooth", alignTo: true })
    setShowDetailed(true)
    toggleChevronDown()
  }

  return (
    <div className="App">
      <Page.Content className="bg-block">
        <div style={{ backgroundColor: "white" }} className="p-5">
          <Grid.Row>
            {/* Sidebar */}
            <Grid.Col className={"col-12 col-lg-3"} id="snapshot">
              <div className={"side-nav"}>
                <h1 className="mb-5">Hello Betty</h1>
                <Avatar
                  size={"xl"}
                  imageURL={betty}
                  className="mb-5"
                />
                <h5 className="mb-5"><a href="https://github.com/facebook/react" target="_blank" rel="noopener noreferrer">Github React repo</a> dashboard</h5>
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
                      className="d-flex align-items-center mb-5"
                      icon="server"
                    >
                      Detailed
                  </List.GroupItem>
                  </List.Group>
                </div>
              </div>
            </Grid.Col>

            {/* Main content */}
            <Grid.Col className={"col-12 col-lg-9"}>
              <Snapshot
                pullsData={pullsData}
                totalNewPulls={totalNewPulls}
                totalClosedPulls={totalClosedPulls}
                totalOpenPulls={totalOpenPulls}
                coreTeamPulls={coreTeamPulls}
              />

              <Card id={"detailed"}>
                {/* Deconstruct Card to build collapse functionality */}
                <Card.Header>
                  <Card.Title>Detailed</Card.Title>
                  <Card.Options>
                    <Card.OptionsItem
                      onClick={() => toggleChevron()}
                      type="collapse"
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
      </Page.Content >
    </div >
  );
}

export default App;
