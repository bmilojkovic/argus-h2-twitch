import { useState } from "react";
import { usePopper } from "react-popper";

import ReactHtmlParser from "react-html-parser";
import SmartImage from "./SmartImage";
import BoonTitle from "./BoonTitle";
import "./css/VowIcon.css";

function VowDetail({ vowDetails }) {
  return (
    <div className="VowDetail">
      <BoonTitle boonTitle={vowDetails.name} rarity="Common" />
      <p>{ReactHtmlParser(vowDetails.description)}</p>
    </div>
  );
}

function VowIcon({ vowDetails }) {
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
          fallbackPlacements: ["bottom"],
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
      ref={setReferenceElement}
      className="VowIcon"
    >
      <SmartImage
        src={`img/${vowDetails.codeName}.png`}
        fallback="img/DefaultBoon.png"
        className="VowImage"
      />
      {isHovering && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          className="PopperElement"
          {...attributes.popper}
        >
          <VowDetail vowDetails={vowDetails} />
        </div>
      )}
    </div>
  );
}

export default VowIcon;
