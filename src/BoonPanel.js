
import { useState } from 'react';

import ReactHtmlParser from 'react-html-parser';
import SmartImage from './SmartImage'
import './css/BoonPanel.css'

function BoonDetail({boonDetails}) {
  return (
    <div className='BoonDetail' style={{backgroundImage: `url(img/${boonDetails.rarity}_detail_back.png)`}}>
      <h1>{boonDetails.name}</h1>
      <p>{ReactHtmlParser(boonDetails.description)}</p>
      {boonDetails.effects != null ?
        <ul>
            {boonDetails.effects.map((boonEffect, i) =>
            <li key={`${boonDetails.codeName}Effect${i}`}>{boonEffect.text} : {boonEffect.value}</li>
            )}
        </ul>
        :
        ""}
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
        width: "64px",
        height: "64px",
      } : {
        position: "relative",
        width: "66px",
        height: "66px",
        left: "5px"
      }}>
      
        <SmartImage
          src={`img/${boonDetails.codeName}.png`}
          fallback="img/DefaultBoon.png"
          className={!boonDetails.codeName.startsWith("Empty") ? "BoonImage" : "EmptyBoonImage"}
        />
        {isHovering && !boonDetails.codeName.startsWith("Empty") && <BoonDetail boonDetails={boonDetails}/>}
      </div>
  );
}

export default BoonPanel;