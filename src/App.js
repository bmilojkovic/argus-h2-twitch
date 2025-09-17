import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

import './App.css';

function SmartImage({ src, fallback, style }) {
  const ref = useRef();

  function handleFallback() {
    // Nullify the error event for subsequent calls
    ref.current.onError = null;
    ref.current.src = fallback;
  }

  return <img ref={ref} src={src} onError={handleFallback} className="BoonImage"/>;
}

function ElementPanel({elementalData}) {
  const emptyElementalData = [
    {name: "Earth", value: 0},
    {name: "Water", value: 0},
    {name: "Air", value: 0},
    {name: "Fire", value: 0},
    {name: "Aether", value: 0}
  ];

  return (
    <div className="ElementPanel">
      {elementalData != null ? elementalData.map((element) =>
        <span><span>{element.value}</span><img className="ElementImage" src={`img/Element_${element.name}.png`}/>&nbsp;</span>
      )
      :
      emptyElementalData.map((element) =>
        <span><span>{element.value}</span><img className="ElementImage" src={`img/Element_${element.name}.png`}/>&nbsp;</span>
      )}
    </div>
  )
}

function BoonDetail({boonName, boonDescription, boonEffects}) {
  return (
    <div className='BoonDetail'>
      <h1>{boonName}</h1>
      <p>{boonDescription}</p>
      <ul>
        {boonEffects.map((boonEffect, i) =>
          <li key={`${boonName}Effect${i}`}>{boonEffect}</li>
        )}
      </ul>
    </div>
  )
}

function BoonPanel({boonName, boonRarity="Common", boonDescription}) {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className="BoonPanel"
      style={!boonName.startsWith("Empty") ? {
        border: "10px solid transparent",
        borderImageSource: `url("img/Frame${boonRarity}.png")`,
        borderImageSlice: "25",
        borderImageWidth: "25px",
        borderImageRepeat: "fill",
        position: "relative",
        width: "78px",
        height: "78px",
      } : {
        position: "relative",
        width: "88px",
        height: "88px",
        left: "5px"
      }}>
      
        <SmartImage
          src={`img/${boonName}.png`}
          fallback="img/DefaultBoon.png"
        />
        {isHovering && !boonName.startsWith("Empty") && <BoonDetail boonName={boonName} boonDescription={boonDescription} boonEffects={["Effect1", "Effect2"]}/>}
      </div>
  );
}

function App() {
  const [weaponData, setWeaponData] = useState({})
  const [familiarData, setFamiliarData] = useState({})
  const [allBoons, setAllBoons] = useState({})
  const [elementalData, setElementalData] = useState(null)

  useEffect(() => {
    var twitch = window.Twitch.ext;
    twitch.listen("broadcast", function(target, contentType, message) {
      var runData = JSON.parse(message);
      setAllBoons(runData.boonData);
      setWeaponData(runData.weaponData);
      setFamiliarData(runData.familiarData);
      setElementalData(runData.elementalData);
      console.log(message);
    });
  }, []);
  
  return (
    <div className="App">
      <ElementPanel elementalData={elementalData} />
      <ul>
        {weaponData != null && weaponData.name != null ?
          <li key="WeaponKey">
            <BoonPanel boonName={weaponData.name} boonRarity={weaponData.rarity} boonDescription={weaponData.description}/>
          </li>
        : ""}
        {familiarData != null && familiarData.name != null ?
          <li key="FamiliarKey">
            <BoonPanel boonName={familiarData.name}/>
          </li>
        : ""}
        <li key="WeaponBoonKey">
          <BoonPanel
            boonName={"weaponBoon" in allBoons ? allBoons.weaponBoon.name : "EmptyWeaponBoon"}
            boonRarity={"weaponBoon" in allBoons ? allBoons.weaponBoon.rarity : ""}
          />
        </li>
        <li key="SpecialBoonKey">
          <BoonPanel
            boonName={"specialBoon" in allBoons ? allBoons.specialBoon.name : "EmptySpecialBoon"}
            boonRarity={"specialBoon" in allBoons ? allBoons.specialBoon.rarity : ""}
          />
        </li>
        <li key="CastBoonKey">
          <BoonPanel
            boonName={"castBoon" in allBoons ? allBoons.castBoon.name : "EmptyCastBoon"}
            boonRarity={"castBoon" in allBoons ? allBoons.castBoon.rarity : ""}
          />
        </li>
        <li key="SprintBoonKey">
          <BoonPanel
            boonName={"sprintBoon" in allBoons ? allBoons.sprintBoon.name : "EmptySprintBoon"}
            boonRarity={"sprintBoon" in allBoons ? allBoons.sprintBoon.rarity : ""}
          />
        </li>
        <li key="ManaBoonKey">
          <BoonPanel
            boonName={"manaBoon" in allBoons ? allBoons.manaBoon.name : "EmptyManaBoon"}
            boonRarity={"manaBoon" in allBoons ? allBoons.manaBoon.rarity : ""}
          />
        </li>
        {allBoons.otherBoons != null ? allBoons.otherBoons.map((boon) => 
          <li key={`${boon.name}Key`}>
            <BoonPanel boonName={boon.name} boonRarity={boon.rarity} />      
          </li>
        ) : ""}
      </ul>
      
    </div>
  );
}

export default App;
