import "./css/VowPanel.css";

import VowIcon from "./VowIcon";

function VowPanel({ vowData }) {
  return (
    <div className="VowPanel">
      <div className="GridContainer">
        <img
          src="img/main_background.png"
          className="VowPanelBackgroundImage"
        />
        {vowData != null
          ? vowData.vowList.map((singleVow) => (
              <VowIcon key={singleVow.codeName} vowDetails={singleVow} />
            ))
          : ""}
      </div>
    </div>
  );
}

export default VowPanel;
