import "./css/ArcanaPanel.css";

import CardPanel from "./CardPanel";

function ArcanaPanel({ arcanaData }) {
  return (
    <div className="ArcanaPanel">
      <div className="GridContainer">
        <img
          src="img/main_background.png"
          className="ArcanaPanelBackgroundImage"
        />
        {arcanaData != null && arcanaData.arcanaList != null
          ? arcanaData.arcanaList.map((arcanaCard) => (
              <CardPanel key={arcanaCard.codeName} cardDetails={arcanaCard} />
            ))
          : ""}
      </div>
    </div>
  );
}

export default ArcanaPanel;
