import { useState } from "react";

import ReactHtmlParser from "react-html-parser";
import SmartImage from "./SmartImage";
import BoonTitle from "./BoonTitle";
import "./css/BoonIcon.css";

function BoonDetail({ boonDetails, lowPosition = false }) {
  return (
    <div
      className={lowPosition ? "BoonDetail BoonDetailLow" : "BoonDetail"}
      style={{
        backgroundImage: `url(img/${boonDetails.rarity}_detail_back.png)`,
      }}
    >
      <BoonTitle boonTitle={boonDetails.name} rarity={boonDetails.rarity} />
      <p>{ReactHtmlParser(boonDetails.description)}</p>
      {boonDetails.effects != null ? (
        <ul>
          {boonDetails.effects.map((boonEffect, i) => (
            <li key={`${boonDetails.codeName}Effect${i}`}>
              {ReactHtmlParser(boonEffect.text)}{" "}
              <span className="EffectTextColor">
                {ReactHtmlParser(boonEffect.value)}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
}

function BoonIcon({
  boonDetails,
  lowPosition = false,
  isKeepsake = false,
  extraClass = "",
}) {
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
      className={
        (!boonDetails.codeName.startsWith("Empty")
          ? "BoonIcon"
          : "EmptyBoonIcon") +
        " " +
        extraClass
      }
      style={
        isKeepsake
          ? {
              borderImageSource: `url("img/KeepsakeFrame${boonDetails.rarity}.png")`,
            }
          : { borderImageSource: `url("img/Frame${boonDetails.rarity}.png")` }
      }
    >
      <SmartImage
        src={`img/${boonDetails.codeName}.png`}
        fallback="img/DefaultBoon.png"
        className={
          !boonDetails.codeName.startsWith("Empty")
            ? "BoonImage"
            : "EmptyBoonImage"
        }
      />
      {isHovering && !boonDetails.codeName.startsWith("Empty") && (
        <BoonDetail boonDetails={boonDetails} lowPosition={lowPosition} />
      )}
    </div>
  );
}

export default BoonIcon;
