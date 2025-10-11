import { useState } from "react";
import { usePopper } from "react-popper";

import ReactHtmlParser from "react-html-parser";
import SmartImage from "./SmartImage";
import BoonTitle from "./BoonTitle";
import "./css/VowIcon.css";

const levelToRarityMapping = ["Common", "Rare", "Epic", "Heroic"];

function getRarityFromLevel(vowLevel) {
  if (vowLevel == null || vowLevel < 1 || vowLevel > 4) {
    return "Common";
  }

  return levelToRarityMapping[vowLevel - 1];
}

function VowDetail({ vowDetails }) {
  return (
    <div className="VowDetail">
      <BoonTitle
        boonTitle={vowDetails.name}
        rarity={getRarityFromLevel(vowDetails.level)}
      />
      <p>{ReactHtmlParser(vowDetails.description)}</p>
    </div>
  );
}

function VowIcon({ vowDetails, additionalClass = "" }) {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "right",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      },
      {
        name: "preventOverflow",
        options: { padding: 100 },
      },
      {
        name: "flip",
        options: {
          fallbackPlacements: ["bottom", "top"],
        },
      },
    ],
  });

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  function getPipImageName(vowLevel, pipNumber) {
    if (vowLevel >= pipNumber) {
      return "PipFilled0" + pipNumber;
    }
    return "PipUnfilled";
  }

  return (
    <>
      <div
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        ref={setReferenceElement}
        className={
          "VowIcon " +
          additionalClass +
          ("level" in vowDetails ? " ActiveVowIcon" : "")
        }
      >
        <span class="VowName">{vowDetails.shortName}</span>
        <SmartImage
          src={`img/${vowDetails.codeName}.png`}
          fallback="img/DefaultBoon.png"
          className="VowImage"
        />
        <div className="PipContainer">
          {new Array(vowDetails.maxLevels).fill(null).map((value, ind) => (
            <img
              key={vowDetails.codeName + "Pip" + ind}
              src={
                "level" in vowDetails
                  ? `img/${getPipImageName(vowDetails.level, ind + 1)}.png`
                  : "img/PipUnfilled.png"
              }
              className="PipImage"
            />
          ))}
        </div>
      </div>
      {isHovering && "level" in vowDetails && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          className="PopperElement"
          {...attributes.popper}
        >
          <VowDetail vowDetails={vowDetails} />
        </div>
      )}
    </>
  );
}

export default VowIcon;
