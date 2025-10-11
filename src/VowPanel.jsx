import "./css/VowPanel.css";

import VowIcon from "./VowIcon";

function VowPanel({ vowData }) {
  /*
    this array holds the static information about vows that is
    relevant only on FE:
    -short name (used on icon)
    -max levels (used to show empty pips)
  */
  const allVows = [
    {
      shortName: "Pain",
      codeName: "EnemyDamageShrineUpgrade",
      maxLevels: 3,
    },
    {
      shortName: "Grit",
      codeName: "EnemyHealthShrineUpgrade",
      maxLevels: 3,
    },
    {
      shortName: "Wards",
      codeName: "EnemyShieldShrineUpgrade",
      maxLevels: 2,
    },
    {
      shortName: "Frenzy",
      codeName: "EnemySpeedShrineUpgrade",
      maxLevels: 2,
    },
    {
      shortName: "Hordes",
      codeName: "EnemyCountShrineUpgrade",
      maxLevels: 3,
    },
    {
      shortName: "Menace",
      codeName: "NextBiomeEnemyShrineUpgrade",
      maxLevels: 2,
    },
    {
      shortName: "Return",
      codeName: "EnemyRespawnShrineUpgrade",
      maxLevels: 2,
    },
    {
      shortName: "Fangs",
      codeName: "EnemyEliteShrineUpgrade",
      maxLevels: 2,
    },
    {
      shortName: "Scars",
      codeName: "HealingReductionShrineUpgrade",
      maxLevels: 3,
    },
    {
      shortName: "Debt",
      codeName: "ShopPricesShrineUpgrade",
      maxLevels: 2,
    },
    {
      shortName: "Shadow",
      codeName: "MinibossCountShrineUpgrade",
      maxLevels: 1,
    },
    {
      shortName: "Forfeit",
      codeName: "BoonSkipShrineUpgrade",
      maxLevels: 1,
    },
    {
      shortName: "Time",
      codeName: "BiomeSpeedShrineUpgrade",
      maxLevels: 3,
    },
    {
      shortName: "Void",
      codeName: "LimitGraspShrineUpgrade",
      maxLevels: 4,
    },
    {
      shortName: "Hubris",
      codeName: "BoonManaReserveShrineUpgrade",
      maxLevels: 2,
    },
    {
      shortName: "Denial",
      codeName: "BanUnpickedBoonsShrineUpgrade",
      maxLevels: 1,
    },
    {
      shortName: "Rivals",
      codeName: "BossDifficultyShrineUpgrade",
      maxLevels: 4,
    },
  ];

  /*
    this is a helper function to assemble the final object used
    in UI. we take data from backend and smoosh it with constants above.
  */
  function buildVowDetails(uiVow, activeVowList) {
    if (activeVowList == null) {
      return uiVow;
    }

    var toReturn = uiVow;
    activeVowList.forEach((element) => {
      if (element.codeName === uiVow.codeName) {
        toReturn["name"] = element.name;
        toReturn["level"] = element.level;
        toReturn["description"] = element.description;
      }
    });

    return toReturn;
  }

  return (
    <div className="VowPanel">
      <div className="GridContainer">
        <img
          src="img/main_background.png"
          className="VowPanelBackgroundImage"
        />
        {
          //vowData != null && vowData.vowList != null ?
          allVows.map((singleVow) => (
            <VowIcon
              key={singleVow.codeName}
              vowDetails={
                vowData != null
                  ? buildVowDetails(singleVow, vowData.vowList)
                  : singleVow
              }
              additionalClass={singleVow.codeName + "Style"}
            />
          ))
        }
      </div>
    </div>
  );
}

export default VowPanel;
