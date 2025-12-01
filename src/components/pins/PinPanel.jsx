import "../../css/PinPanel.css";

import { Fragment, useRef } from "react";
import BoonIcon from "../BoonIcon";

function RequirementsPanel({
  boonDetails,
  gridClass,
  viewRef,
  isMobile = false,
}) {
  return (
    <div
      className={
        "RequirementsPanel " +
        gridClass +
        (isMobile ? " MobileRequirementsPanel" : "")
      }
    >
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
                          viewRef={viewRef}
                          isMobile={isMobile}
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
                            viewRef={viewRef}
                            isMobile={isMobile}
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

function PinPanel({ pinBoons, isMobile = false }) {
  const viewRef = useRef(null);

  return (
    <div className={!isMobile ? "PinPanel" : "MobilePinPanel"}>
      <div ref={viewRef} className="GridContainer">
        {!isMobile ? (
          <>
            <p className="PinPanelTitle">
              These are the boons that we are going for and their requirements.
            </p>
            <img
              src="img/main_background.png"
              className="PinPanelBackgroundImage"
            />
          </>
        ) : (
          ""
        )}

        {pinBoons != null &&
          (!isMobile ? (
            <>
              {pinBoons.map((boon, ind) => (
                <BoonIcon
                  key={boon.codeName}
                  boonDetails={boon}
                  viewRef={viewRef}
                  extraClass={`PinnedBoon${ind + 1}`}
                />
              ))}{" "}
              {pinBoons.map((boon2, ind2) => (
                <RequirementsPanel
                  key={`Requirements${boon2.codeName}`}
                  boonDetails={boon2}
                  viewRef={viewRef}
                  gridClass={`BoonRequirements${ind2 + 1}`}
                />
              ))}
            </>
          ) : (
            pinBoons.map((boon, ind) => (
              <>
                <BoonIcon
                  key={boon.codeName}
                  boonDetails={boon}
                  viewRef={viewRef}
                  isMobile={true}
                  extraClass={`PinnedBoon${ind + 1}`}
                />
                <RequirementsPanel
                  key={`MobileRequirements${boon.codeName}`}
                  boonDetails={boon}
                  viewRef={viewRef}
                  isMobile={isMobile}
                  gridClass={`MobileBoonRequirements${ind + 1}`}
                />
              </>
            ))
          ))}
      </div>
    </div>
  );
}

export default PinPanel;
