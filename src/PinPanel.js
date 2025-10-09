import "./css/PinPanel.css";

import { Fragment } from "react";
import BoonIcon from "./BoonIcon";

function RequirementsPanel({ boonDetails, gridClass }) {
  return (
    <div className={"RequirementsPanel " + gridClass}>
      {boonDetails.requirements != null
        ? boonDetails.requirements.map((requirementLine, ind) => {
            return (
              <Fragment key={`${boonDetails.codeName}-Fragment-${ind}`}>
                <p
                  key={`Label${boonDetails.codeName}-${ind}`}
                  className="RequirementLabel"
                >
                  {ind + 1}:
                </p>
                {requirementLine.items != null
                  ? requirementLine.items.map((requiredItem, lineInd) =>
                      lineInd % 3 != 0 || lineInd == 0 ? (
                        <BoonIcon
                          key={`${boonDetails.codeName}-${requiredItem.codeName}-${lineInd}`}
                          boonDetails={requiredItem}
                          extraClass={
                            requiredItem["fulfilled"]
                              ? "NoDarkCover"
                              : "DarkCover"
                          }
                        />
                      ) : (
                        <Fragment
                          key={`Fragment-${boonDetails.codeName}-${requiredItem.codeName}-${lineInd}`}
                        >
                          <div
                            key={`Padding-${boonDetails.codeName}-${ind}-${lineInd}`}
                          />
                          <BoonIcon
                            key={`${boonDetails.codeName}-${requiredItem.codeName}-${lineInd}`}
                            boonDetails={requiredItem}
                            extraClass={
                              requiredItem["fulfilled"]
                                ? "NoDarkCover"
                                : "DarkCover"
                            }
                          />
                        </Fragment>
                      )
                    )
                  : ""}
                {new Array((3 - (requirementLine.items.length % 3)) % 3)
                  .fill(null)
                  .map((arrItem, arrInd) => (
                    <div
                      key={`Padding-${boonDetails.codeName}-${ind}-${arrInd}`}
                    ></div>
                  ))}
              </Fragment>
            );
          })
        : ""}
    </div>
  );
}

function PinPanel({ pinBoons }) {
  return (
    <div className="PinPanel">
      <div className="GridContainer">
        <p className="PinPanelTitle">
          These are the boons that we are going for and their requirements.
        </p>
        <img
          src="img/main_background.png"
          className="PinPanelBackgroundImage"
        />
        {pinBoons != null
          ? pinBoons.map((boon, ind) => (
              <BoonIcon
                key={boon.codeName}
                boonDetails={boon}
                extraClass={`PinnedBoon${ind + 1}`}
              />
            ))
          : ""}
        {pinBoons != null
          ? pinBoons.map((boon, ind) => (
              <RequirementsPanel
                key={`Requirements${boon.codeName}`}
                boonDetails={boon}
                gridClass={`BoonRequirements${ind + 1}`}
              />
            ))
          : ""}
      </div>
    </div>
  );
}

export default PinPanel;
