import { useState } from "react";
import { usePopper } from "react-popper";

import ReactHtmlParser from "react-html-parser";
import SmartImage from "./SmartImage";
import BoonTitle from "./BoonTitle";
import "./css/CardPanel.css";

function CardDetail({ cardDetails }) {
  function cardDetailsValid(cardObject) {
    return (
      Object.hasOwn(cardObject, "rarity") &&
      Object.hasOwn(cardObject, "name") &&
      Object.hasOwn(cardObject, "description")
    );
  }

  return cardDetailsValid(cardDetails) ? (
    <div
      className="CardDetail"
      style={{
        backgroundImage: `url(img/${cardDetails.rarity}_detail_back.png)`,
      }}
    >
      <BoonTitle boonTitle={cardDetails.name} rarity={cardDetails.rarity} />
      <p>{ReactHtmlParser(cardDetails.description)}</p>
    </div>
  ) : (
    <div />
  );
}

function CardPanel({ cardDetails }) {
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
        options: {
          altBoundary: true,
        },
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

  return Object.hasOwn(cardDetails, "codeName") ? (
    <>
      <div
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className={
          "CardPanel " + ("rarity" in cardDetails ? " ActiveCardPanel" : "")
        }
        ref={setReferenceElement}
      >
        <SmartImage
          src={`img/${cardDetails.codeName}.png`}
          fallback="img/DefaultBoon.png"
          className="CardImage"
        />
      </div>
      {isHovering && "rarity" in cardDetails && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          className="PopperElement"
          {...attributes.popper}
        >
          <CardDetail cardDetails={cardDetails} />
        </div>
      )}
    </>
  ) : (
    <div />
  );
}

export default CardPanel;
