import { useState } from "react";
import { usePopper } from "react-popper";

import ReactHtmlParser from "react-html-parser";
import SmartImage from "./SmartImage";
import BoonTitle from "./BoonTitle";
import "./css/BoonIcon.css";

function BoonDetail({ boonDetails, displayType = "Boon" }) {
  function checkBoonDetailsValid(detailsObject) {
    return (
      Object.hasOwn(detailsObject, "codeName") &&
      Object.hasOwn(detailsObject, "rarity") &&
      Object.hasOwn(detailsObject, "name") &&
      Object.hasOwn(detailsObject, "description")
    );
  }

  return checkBoonDetailsValid(boonDetails) ? (
    <div
      className="BoonDetail"
      style={
        displayType === "Familiar"
          ? {
              backgroundImage: `url(img/Common_detail_back.png)`,
            }
          : {
              backgroundImage: `url(img/${boonDetails.rarity}_detail_back.png)`,
            }
      }
    >
      <BoonTitle
        boonTitle={boonDetails.name}
        rarity={boonDetails.rarity}
        displayType={displayType}
      />
      <span className="DetailText">
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
      </span>
    </div>
  ) : (
    <div />
  );
}

function BoonIcon({ boonDetails, extraClass = "", displayType = "Boon" }) {
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

  function checkBoonIconValid(detailsObject) {
    return (
      Object.hasOwn(detailsObject, "codeName") &&
      Object.hasOwn(detailsObject, "rarity")
    );
  }

  return checkBoonIconValid(boonDetails) ? (
    <>
      <div
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        ref={setReferenceElement}
        className={
          (!boonDetails.codeName.startsWith("Empty")
            ? "BoonIcon"
            : "EmptyBoonIcon") +
          " " +
          extraClass
        }
        style={
          displayType === "Keepsake"
            ? {
                borderImageSource: `url("img/KeepsakeFrame${boonDetails.rarity}.png")`,
              }
            : displayType === "Familiar"
            ? { borderImageSource: `url("img/FrameCommon.png")` }
            : displayType === "Boon" &&
              Object.hasOwn(boonDetails, "boonType") &&
              boonDetails.boonType === "Hammer"
            ? { borderImageSource: `url("img/FrameHammer.png")` }
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
      </div>
      {isHovering && !boonDetails.codeName.startsWith("Empty") && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          className="PopperElement"
          {...attributes.popper}
        >
          <BoonDetail boonDetails={boonDetails} displayType={displayType} />
        </div>
      )}
    </>
  ) : (
    <div />
  );
}

export default BoonIcon;
