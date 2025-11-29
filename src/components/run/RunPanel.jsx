import { useRef } from "react";

import "../../css/RunPanel.css";

import ElementPanel from "./ElementPanel";
import BoonIcon from "../BoonIcon";
import ExtraPanel from "./ExtraPanel";

function RunPanel({
  allBoons,
  weaponData,
  familiarData,
  elementalData,
  extraData,
  isMobile = false,
}) {
  const viewRef = useRef(null);

  function isNullOrEmptyObject(obj) {
    // First, ensure the input is actually an object and not null or undefined
    if (typeof obj !== "object" || obj === null) {
      return true;
    }

    // Get an array of the object's own enumerable property names
    const keys = Object.keys(obj);

    // If the length of this array is 0, the object is empty
    return keys.length === 0;
  }

  function isDataEmpty() {
    return (
      isNullOrEmptyObject(allBoons) &&
      isNullOrEmptyObject(weaponData) &&
      isNullOrEmptyObject(familiarData) &&
      isNullOrEmptyObject(elementalData) &&
      isNullOrEmptyObject(extraData)
    );
  }

  return (
    <div ref={viewRef} className={!isMobile ? "RunPanel" : "MobileRunPanel"}>
      <div className="GridContainer">
        {!isMobile ? (
          <img
            src="img/main_background.png"
            className="RunPanelBackgroundImage"
          />
        ) : (
          ""
        )}
        {isDataEmpty() ? <div className="EmptyDataHint"></div> : ""}
        <ElementPanel elementalData={elementalData} isMobile={isMobile} />
        {weaponData != null && weaponData.name != null ? (
          <BoonIcon
            boonDetails={weaponData}
            viewRef={viewRef}
            displayType="Weapon"
            extraClass="WeaponSlot"
            isMobile={isMobile}
          />
        ) : (
          <div className="WeaponSlot" />
        )}
        {familiarData != null && familiarData.name != null ? (
          <BoonIcon
            boonDetails={familiarData}
            viewRef={viewRef}
            displayType="Familiar"
            extraClass="FamiliarSlot"
            isMobile={isMobile}
          />
        ) : (
          <div className="FamiliarSlot" />
        )}
        <BoonIcon
          boonDetails={
            "weaponBoon" in allBoons
              ? allBoons.weaponBoon
              : { codeName: "EmptyWeaponBoon", rarity: "" }
          }
          viewRef={viewRef}
          extraClass="AttackSlot"
          isMobile={isMobile}
        />
        <BoonIcon
          boonDetails={
            "specialBoon" in allBoons
              ? allBoons.specialBoon
              : { codeName: "EmptySpecialBoon", rarity: "" }
          }
          viewRef={viewRef}
          extraClass="SpecialSlot"
          isMobile={isMobile}
        />
        <BoonIcon
          boonDetails={
            "castBoon" in allBoons
              ? allBoons.castBoon
              : { codeName: "EmptyCastBoon", rarity: "" }
          }
          viewRef={viewRef}
          extraClass="CastSlot"
          isMobile={isMobile}
        />
        <BoonIcon
          boonDetails={
            "sprintBoon" in allBoons
              ? allBoons.sprintBoon
              : { codeName: "EmptySprintBoon", rarity: "" }
          }
          viewRef={viewRef}
          extraClass="SprintSlot"
          isMobile={isMobile}
        />
        <BoonIcon
          boonDetails={
            "manaBoon" in allBoons
              ? allBoons.manaBoon
              : { codeName: "EmptyManaBoon", rarity: "" }
          }
          viewRef={viewRef}
          extraClass="ManaSlot"
          isMobile={isMobile}
        />
        {allBoons.otherBoons != null
          ? allBoons.otherBoons.map((boon, ind) => (
              <BoonIcon
                key={boon.codeName + ind}
                boonDetails={boon}
                viewRef={viewRef}
                isMobile={isMobile}
              />
            ))
          : ""}
      </div>
      {extraData != null ? (
        <ExtraPanel
          extraData={extraData}
          viewRef={viewRef}
          isMobile={isMobile}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default RunPanel;
