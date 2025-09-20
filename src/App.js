import { useState } from 'react';
import { useEffect } from 'react';

import './css/App.css';
import ElementPanel from './ElementPanel'
import BoonPanel from './BoonPanel'
import KeepsakePanel from './KeepsakePanel'

function App() {
  const [weaponData, setWeaponData] = useState({})
  const [familiarData, setFamiliarData] = useState({})
  const [allBoons, setAllBoons] = useState({})
  const [elementalData, setElementalData] = useState(null)
  const [keepsakeData, setKeepsakeData] = useState(null)

  useEffect(() => {
    var twitch = window.Twitch.ext;
    twitch.listen("broadcast", function(target, contentType, message) {
      var runData = JSON.parse(message);
      setAllBoons(runData.boonData);
      setWeaponData(runData.weaponData);
      setFamiliarData(runData.familiarData);
      setKeepsakeData(runData.keepsakeData);
      setElementalData(runData.elementalData);
      console.log(message);
    });
  }, []);
  
  return (
    <div className="App">
      <img src="img/main_background.png" className="AppBackgroundImage"/>
      <div className="GridContainer">
        <ElementPanel elementalData={elementalData} />
        {weaponData != null && weaponData.name != null ?
          <BoonPanel boonDetails={weaponData}/>
        : ""}
        {familiarData != null && familiarData.name != null ?
          <BoonPanel boonDetails={familiarData}/>
        : ""}
        <BoonPanel
          boonDetails={"weaponBoon" in allBoons ? allBoons.weaponBoon : {codeName : "EmptyWeaponBoon", rarity : ""}}
        />
        <BoonPanel
          boonDetails={"specialBoon" in allBoons ? allBoons.specialBoon : {codeName : "EmptySpecialBoon", rarity : ""}}
        />
        <BoonPanel
          boonDetails={"castBoon" in allBoons ? allBoons.castBoon : {codeName : "EmptyCastBoon", rarity : ""}}
        />
        <BoonPanel
          boonDetails={"sprintBoon" in allBoons ? allBoons.sprintBoon : {codeName : "EmptySprintBoon", rarity : ""}}
        />
        <BoonPanel
          boonDetails={"manaBoon" in allBoons ? allBoons.manaBoon : {codeName : "EmptyManaBoon", rarity : ""}}
        />
        {allBoons.otherBoons != null ? allBoons.otherBoons.map((boon) => 
          <BoonPanel boonDetails={boon}/>      
        ) : ""}
        {keepsakeData != null ? <KeepsakePanel keepsakeData={keepsakeData} /> : ""}
      </div>
      
    </div>
  );
}

export default App;
