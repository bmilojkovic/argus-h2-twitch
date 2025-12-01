import { useState, useRef } from "react";
import { usePopper } from "react-popper";

import ReactHtmlParser from "react-html-parser";
import SmartImage from "../SmartImage";
import BoonTitle from "../BoonTitle";
import "../../css/CardPanel.css";

function CardDetail({ cardDetails, isMobile = false }) {
  function cardDetailsValid(cardObject) {
    return (
      Object.hasOwn(cardObject, "rarity") &&
      Object.hasOwn(cardObject, "name") &&
      Object.hasOwn(cardObject, "description")
    );
  }

  return cardDetailsValid(cardDetails) ? (
    <div
      className={"CardDetail " + (isMobile ? "MobileCardDetail" : "")}
      style={{
        backgroundImage: `url(img/${cardDetails.rarity}_detail_back${
          isMobile ? "_mobile" : ""
        }.png)`,
      }}
    >
      <BoonTitle
        boonTitle={cardDetails.name}
        rarity={cardDetails.rarity}
        isMobile={isMobile}
      />
      <span className={!isMobile ? "DetailText" : "MobileDetailText"}>
        <p>{ReactHtmlParser(cardDetails.description)}</p>
      </span>
    </div>
  ) : (
    <div />
  );
}

function CardPanel({ cardDetails, viewRef, isMobile = false }) {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(
    referenceElement,
    popperElement,
    !isMobile
      ? {
          //standard parameters
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
              options: { padding: 10, boundary: viewRef.current },
            },
            {
              name: "flip",
              options: {
                fallbackPlacements: ["bottom", "top"],
              },
            },
          ],
        }
      : {
          //mobile parameters
          placement: "bottom",
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 10],
              },
            },
            {
              name: "preventOverflow",
              options: { padding: 10, boundary: viewRef.current },
            },
            {
              name: "flip",
              options: {
                fallbackPlacements: ["top"],
              },
            },
          ],
        }
  );

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return Object.hasOwn(cardDetails, "codeName") ? (
    <>
      <div
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className={
          "CardPanel " +
          ("rarity" in cardDetails ? " ActiveCardPanel " : "") +
          (isMobile ? "MobileCardPanel" : "")
        }
        ref={setReferenceElement}
      >
        <SmartImage
          src={`img/${cardDetails.codeName}.png`}
          fallback="img/DefaultBoon.png"
          className={"CardImage " + (isMobile ? "MobileCardImage" : "")}
        />
      </div>
      {isHovering && "rarity" in cardDetails && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          className={"PopperElement " + (isMobile ? "MobilePopperElement" : "")}
          {...attributes.popper}
        >
          <CardDetail cardDetails={cardDetails} isMobile={isMobile} />
        </div>
      )}
    </>
  ) : (
    <div />
  );
}

export default CardPanel;
