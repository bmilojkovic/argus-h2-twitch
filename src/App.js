import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import ReactHtmlParser from 'react-html-parser';


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
        <span><span>{ReactHtmlParser(element.value)}</span><img className="ElementImage" src={`img/Element_${element.name}.png`}/>&nbsp;</span>
      )
      :
      emptyElementalData.map((element) =>
        <span><span>{element.value}</span><img className="ElementImage" src={`img/Element_${element.name}.png`}/>&nbsp;</span>
      )}
    </div>
  )
}

function BoonDetail({boonDetails}) {
  return (
    <div className='BoonDetail'>
      <h1>{boonDetails.name}</h1>
      <p>{ReactHtmlParser(boonDetails.description)}</p>
      <ul>
        {boonDetails.effects.map((boonEffect, i) =>
          <li key={`${boonDetails.codeName}Effect${i}`}>{boonEffect.text} : {boonEffect.value}</li>
        )}
      </ul>
    </div>
  )
}

function BoonPanel({boonDetails}) {
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
      style={!boonDetails.codeName.startsWith("Empty") ? {
        border: "10px solid transparent",
        borderImageSource: `url("img/Frame${boonDetails.rarity}.png")`,
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
          src={`img/${boonDetails.codeName}.png`}
          fallback="img/DefaultBoon.png"
        />
        {isHovering && !boonDetails.codeName.startsWith("Empty") && <BoonDetail boonDetails={boonDetails}/>}
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
            <BoonPanel boonDetails={weaponData}/>
          </li>
        : ""}
        {familiarData != null && familiarData.name != null ?
          <li key="FamiliarKey">
            <BoonPanel boonDetails={familiarData}/>
          </li>
        : ""}
        <li key="WeaponBoonKey">
          <BoonPanel
            boonDetails={"weaponBoon" in allBoons ? allBoons.weaponBoon : {codeName : "EmptyWeaponBoon", rarity : ""}}
          />
        </li>
        <li key="SpecialBoonKey">
          <BoonPanel
            boonDetails={"specialBoon" in allBoons ? allBoons.specialBoon : {codeName : "EmptySpecialBoon", rarity : ""}}
          />
        </li>
        <li key="CastBoonKey">
          <BoonPanel
            boonDetails={"castBoon" in allBoons ? allBoons.castBoon : {codeName : "EmptyCastBoon", rarity : ""}}
          />
        </li>
        <li key="SprintBoonKey">
          <BoonPanel
            boonDetails={"sprintBoon" in allBoons ? allBoons.sprintBoon : {codeName : "EmptySprintBoon", rarity : ""}}
          />
        </li>
        <li key="ManaBoonKey">
          <BoonPanel
            boonDetails={"manaBoon" in allBoons ? allBoons.manaBoon : {codeName : "EmptyManaBoon", rarity : ""}}
          />
        </li>
        {allBoons.otherBoons != null ? allBoons.otherBoons.map((boon) => 
          <li key={`${boon.codeName}Key`}>
            <BoonPanel boonDetails={boon}/>      
          </li>
        ) : ""}
      </ul>
      
    </div>
  );
}

export default App;
