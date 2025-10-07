import { useState } from "react";
import { usePopper } from "react-popper";

import ReactHtmlParser from "react-html-parser";
import SmartImage from "./SmartImage";
import BoonTitle from "./BoonTitle";
import "./css/CardPanel.css";

function CardDetail({ cardDetails }) {
  return (
    <div
      className="CardDetail"
      style={{
        backgroundImage: `url(img/${cardDetails.rarity}_detail_back.png)`,
      }}
    >
      <BoonTitle boonTitle={cardDetails.name} rarity={cardDetails.rarity} />
      <p>{ReactHtmlParser(cardDetails.description)}</p>
    </div>
  );
}

function CardPanel({ cardDetails, boundaryRef }) {
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

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className="CardPanel"
      ref={setReferenceElement}
    >
      <SmartImage
        src={`img/${cardDetails.codeName}.png`}
        fallback="img/DefaultBoon.png"
        className="CardImage"
      />
      {isHovering && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          className="PopperElement"
          {...attributes.popper}
        >
          <CardDetail cardDetails={cardDetails} />
        </div>
      )}
    </div>
  );
}

export default CardPanel;
