import "../../css/mobile/MobileRunPanel.css";

import ElementPanel from "./ElementPanel";
import BoonIcon from "../BoonIcon";
import ExtraPanel from "./ExtraPanel";

function MobileRunPanel({
  allBoons,
  weaponData,
  familiarData,
  elementalData,
  extraData,
}) {
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
    <div className="MobileRunPanel">
      <div className="GridContainer">
        {isDataEmpty() ? <div className="EmptyDataHint"></div> : ""}
        <ElementPanel elementalData={elementalData} isMobile={true} />
        {weaponData != null && weaponData.name != null ? (
          <BoonIcon
            boonDetails={weaponData}
            displayType="Weapon"
            extraClass="WeaponSlot"
          />
        ) : (
          <div className="WeaponSlot" />
        )}
        {familiarData != null && familiarData.name != null ? (
          <BoonIcon
            boonDetails={familiarData}
            displayType="Familiar"
            extraClass="FamiliarSlot"
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
          extraClass="AttackSlot"
        />
        <BoonIcon
          boonDetails={
            "specialBoon" in allBoons
              ? allBoons.specialBoon
              : { codeName: "EmptySpecialBoon", rarity: "" }
          }
          extraClass="SpecialSlot"
        />
        <BoonIcon
          boonDetails={
            "castBoon" in allBoons
              ? allBoons.castBoon
              : { codeName: "EmptyCastBoon", rarity: "" }
          }
          extraClass="CastSlot"
        />
        <BoonIcon
          boonDetails={
            "sprintBoon" in allBoons
              ? allBoons.sprintBoon
              : { codeName: "EmptySprintBoon", rarity: "" }
          }
          extraClass="SprintSlot"
        />
        <BoonIcon
          boonDetails={
            "manaBoon" in allBoons
              ? allBoons.manaBoon
              : { codeName: "EmptyManaBoon", rarity: "" }
          }
          extraClass="ManaSlot"
        />
        {allBoons.otherBoons != null
          ? allBoons.otherBoons.map((boon, ind) => (
              <BoonIcon key={boon.codeName + ind} boonDetails={boon} />
            ))
          : ""}
      </div>
      {extraData != null ? <ExtraPanel extraData={extraData} /> : ""}
    </div>
  );
}

export default MobileRunPanel;
