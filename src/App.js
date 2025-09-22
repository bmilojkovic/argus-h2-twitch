import { useState } from 'react';
import { useEffect } from 'react';

import './css/App.css';
import RunPanel from './RunPanel'

function App() {
  const [activeTab, setActiveTab] = useState('runTab');

  const [allBoons, setAllBoons] = useState({})
  const [weaponData, setWeaponData] = useState({})
  const [familiarData, setFamiliarData] = useState({})
  const [elementalData, setElementalData] = useState(null)
  const [extraData, setExtraData] = useState(null)

  useEffect(() => {
    var twitch = window.Twitch.ext;
    twitch.listen("broadcast", function(target, contentType, message) {
      var runData = JSON.parse(message);
      setAllBoons(runData.boonData);
      setWeaponData(runData.weaponData);
      setFamiliarData(runData.familiarData);
      setExtraData(runData.extraData);
      setElementalData(runData.elementalData);
      console.log(message);
    });
  }, []);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  
  return (
    <div className="App">
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
        {activeTab === "runTab" && <RunPanel allBoons={allBoons} weaponData={weaponData} familiarData={familiarData} elementalData={elementalData} extraData={extraData}/>}
        {activeTab === "pinTab" && <div >pin tab</div>}
      </div>
    </div>
  );
}

export default App;