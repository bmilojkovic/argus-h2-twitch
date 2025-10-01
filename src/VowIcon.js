
import { useState } from 'react';

import ReactHtmlParser from 'react-html-parser';
import SmartImage from './SmartImage'
import BoonTitle from './BoonTitle'
import './css/VowIcon.css'

function VowDetail({vowDetails}) {
  return (
    <div className="VowDetail">
      <BoonTitle boonTitle={vowDetails.name} rarity="Common" />
      <p>{ReactHtmlParser(vowDetails.description)}</p>
    </div>
  )
}

function VowIcon({vowDetails}) {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="VowIcon">
        <SmartImage
          src={`img/${vowDetails.codeName}.png`}
          fallback="img/DefaultBoon.png"
          className="VowImage"
        />
        {isHovering && <VowDetail vowDetails={vowDetails}/>}
      </div>
  );
}

export default VowIcon;