import { useState } from 'react';
import { useEffect } from 'react';
import { useImmerReducer } from "use-immer";

import './css/App.css';
import RunPanel from './RunPanel'
import PinPanel from './PinPanel'

import ArgusReducer from './Reducer';

function App() {
  
  const [activeTab, setActiveTab] = useState('runTab');

  const [state, dispatch] = useImmerReducer(ArgusReducer, {
    allBoons: {},
    weaponData: null,
    familiarData: null,
    elementalData: null,
    extraData: null,
    pinBoons: null
  });

  useEffect(() => {
    var twitch = window.Twitch.ext;
    twitch.listen("broadcast", function(target, contentType, message) {
      var runData = JSON.parse(message);
      
      if (runData.boonData != null) {
        dispatch({type: "allBoons", data: runData.boonData});
      }
      if (runData.weaponData != null) {
        dispatch({type: "weapon", data: runData.weaponData});
      }
      if (runData.familiarData != null) {
        dispatch({type: "familiar", data: runData.familiarData});
      }
      if (runData.extraData != null) {
        dispatch({type: "extra", data: runData.extraData});
      }
      if (runData.elementalData != null) {
        dispatch({type: "elemental", data: runData.elementalData});
      }
      if (runData.pinData != null) {
        dispatch({type: "pin", data: runData.pinData});
      }
    });
  }, []);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  
  return (
    <div className="App">
      <div className="AppBackground" />
      <div className="TabList">
        <div className={activeTab === 'runTab' ? 'RunTabButton ActiveTabButton' : 'RunTabButton'}
             onClick={() => handleTabClick('runTab')}>
          <img src="img/boon_tab_icon.png" className="TabButtonImage"/>
        </div>

        <div className={activeTab === 'pinTab' ? 'PinTabButton ActiveTabButton' : 'PinTabButton'}
             onClick={() => handleTabClick('pinTab')}>
          <img src="img/pin_tab_icon.png" className="TabButtonImage"/>
        </div>
      </div>
      <div className="TabbedContent">
        {activeTab === "runTab" && <RunPanel allBoons={state.allBoons} weaponData={state.weaponData} familiarData={state.familiarData} elementalData={state.elementalData} extraData={state.extraData}/>}
        {activeTab === "pinTab" && <PinPanel pinBoons={state.pinData}/>}
      </div>
    </div>
  );
}

export default App;