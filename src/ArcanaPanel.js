import { useRef } from "react";

import "./css/ArcanaPanel.css";

import CardPanel from "./CardPanel";

function ArcanaPanel({ arcanaData }) {
  const arcanaGridRef = useRef(null);

  return (
    <div className="ArcanaPanel">
      <div className="GridContainer" ref={arcanaGridRef}>
        <img
          src="img/main_background.png"
          className="ArcanaPanelBackgroundImage"
        />
        {arcanaData != null
          ? arcanaData.arcanaList.map((arcanaCard) => (
              <CardPanel
                key={arcanaCard.codeName}
                cardDetails={arcanaCard}
                boundaryRef={arcanaGridRef}
              />
            ))
          : ""}
      </div>
    </div>
  );
}

export default ArcanaPanel;
