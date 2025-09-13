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

  return <img ref={ref} src={src} onError={handleFallback} class="BoonImage"/>;
}

function BoonPanel({boonName, boonRarity="Common"}) {
  
  return (
    <div
      className="BoonPanel"
      style={!boonName.startsWith("Empty") ? {
        border: "10px solid transparent",
        borderImage: `url(\"img/Frame${boonRarity}.png\")`,
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
      </div>   
  );
}

function App() {
  const [isSubscribed, setSubscribed] = useState(false)

  const [allBoons, setAllBoons] = useState({})

  useEffect(() => {
    if (!isSubscribed) {
      setSubscribed(true);
      var twitch = window.Twitch.ext;
      twitch.listen("broadcast", function(target, contentType, message) {
        setAllBoons(JSON.parse(message));
        console.log(message);
      });
    }
  });
  
  return (
    <div className="App">
      <ul>
        <li>
          <BoonPanel
            boonName={"weaponBoon" in allBoons ? allBoons.weaponBoon.name : "EmptyWeaponBoon"}
            boonRarity={"weaponBoon" in allBoons ? allBoons.weaponBoon.rarity : ""}
          />
        </li>
        <li>
          <BoonPanel
            boonName={"specialBoon" in allBoons ? allBoons.specialBoon.name : "EmptySpecialBoon"}
            boonRarity={"specialBoon" in allBoons ? allBoons.specialBoon.rarity : ""}
          />
        </li>
        <li>
          <BoonPanel
            boonName={"castBoon" in allBoons ? allBoons.castBoon.name : "EmptyCastBoon"}
            boonRarity={"castBoon" in allBoons ? allBoons.castBoon.rarity : ""}
          />
        </li>
        <li>
          <BoonPanel
            boonName={"sprintBoon" in allBoons ? allBoons.sprintBoon.name : "EmptySprintBoon"}
            boonRarity={"sprintBoon" in allBoons ? allBoons.sprintBoon.rarity : ""}
          />
        </li>
        <li>
          <BoonPanel
            boonName={"manaBoon" in allBoons ? allBoons.manaBoon.name : "EmptyManaBoon"}
            boonRarity={"manaBoon" in allBoons ? allBoons.manaBoon.rarity : ""}
          />
        </li>
        {allBoons.otherBoons != null ? allBoons.otherBoons.map((boon) => 
          <li>
            <BoonPanel boonName={boon.name} boonRarity={boon.rarity} />      
          </li>
        ) : ""}
      </ul>
      
    </div>
  );
}

export default App;
