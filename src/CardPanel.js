
import { useState } from 'react';

import ReactHtmlParser from 'react-html-parser';
import SmartImage from './SmartImage'
import BoonTitle from './BoonTitle'
import './css/CardPanel.css'

function CardDetail({cardDetails}) {
  return (
    <div className="CardDetail" style={{backgroundImage: `url(img/${cardDetails.rarity}_detail_back.png)`}}>
      <BoonTitle boonTitle={cardDetails.name} rarity={cardDetails.rarity} />
      <p>{ReactHtmlParser(cardDetails.description)}</p>
    </div>
  )
}

function CardPanel({cardDetails}) {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="CardPanel">
        <SmartImage
          src={`img/${cardDetails.codeName}.png`}
          fallback="img/DefaultBoon.png"
          className="CardImage"
        />
        {isHovering && <CardDetail cardDetails={cardDetails}/>}
      </div>
  );
}

export default CardPanel;