
import { useState } from 'react';

import ReactHtmlParser from 'react-html-parser';
import SmartImage from './SmartImage'
import BoonTitle from './BoonTitle'
import './css/BoonPanel.css'

function BoonDetail({boonDetails, lowPosition=false}) {
  return (
    <div className={lowPosition ? "BoonDetail BoonDetailLow" : "BoonDetail"} style={{backgroundImage: `url(img/${boonDetails.rarity}_detail_back.png)`}}>
      <BoonTitle boonTitle={boonDetails.name} rarity={boonDetails.rarity} />
      <p>{ReactHtmlParser(boonDetails.description)}</p>
      {boonDetails.effects != null ?
        <ul>
            {boonDetails.effects.map((boonEffect, i) =>
            <li key={`${boonDetails.codeName}Effect${i}`}>{ReactHtmlParser(boonEffect.text)} <span className="EffectTextColor">{ReactHtmlParser(boonEffect.value)}</span></li>
            )}
        </ul>
        :
        ""}
    </div>
  )
}

function BoonPanel({boonDetails, lowPosition=false}) {
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
        width: "64px",
        height: "64px",
      } : {
        position: "relative",
        width: "66px",
        height: "66px",
      }}>
      
        <SmartImage
          src={`img/${boonDetails.codeName}.png`}
          fallback="img/DefaultBoon.png"
          className={!boonDetails.codeName.startsWith("Empty") ? "BoonImage" : "EmptyBoonImage"}
        />
        {isHovering && !boonDetails.codeName.startsWith("Empty") && <BoonDetail boonDetails={boonDetails} lowPosition={lowPosition}/>}
      </div>
  );
}

export default BoonPanel;