import "./css/ArcanaPanel.css";

import CardPanel from "./CardPanel";

const allCards = [
  "ChannelSlowMetaUpgrade",
  "DoorHealMetaUpgrade",
  "LowManaDamageMetaupgrade",
  "CastDamageMetaUpgrade",
  "SorceryRegenMetaUpgrade",
  "InsideCastBuffMetaUpgrade",
  "HealthManaBonusMetaUpgrade",
  "DodgeBonusMetaUpgrade",
  "ManaOverTimeMetaUpgrade",
  "MagicCritMetaUpgrade",
  "SprintShieldMetaUpgrade",
  "LastStandSlowTimeMetaUpgrade",
  "ChamberHealthMetaUpgrade",
  "EffectVulnerabilityMetaUpgrade",
  "BossShieldMetaUpgrade",
  "DoorRerollMetaUpgrade",
  "StartingGoldMetaUpgrade",
  "MetaToRunMetaUpgrade",
  "RarityBoostMetaUpgrade",
  "DuoRarityBoostMetaUpgrade",
  "RerollTradeOffMetaUpgrade",
  "PanelRerollMetaUpgrade",
  "LowHealthBuffMetaUpgrade",
  "EpicRarityBoostMetaUpgrade",
  "BossProgressionMetaUpgrade",
];

/*
    this is a helper function to assemble the final object used
    in UI. we take data from backend and smoosh it with constants above.
  */
function buildArcanaDetails(uiArcana, activeArcanaList) {
  var toReturn = { codeName: uiArcana };

  if (activeArcanaList == null) {
    return toReturn;
  }

  activeArcanaList.forEach((element) => {
    if (element.codeName === uiArcana) {
      toReturn["name"] = element.name;
      toReturn["rarity"] = element.rarity;
      toReturn["description"] = element.description;
    }
  });

  return toReturn;
}

function ArcanaPanel({ arcanaData }) {
  return (
    <div className="ArcanaPanel">
      <div className="GridContainer">
        <img
          src="img/main_background.png"
          className="ArcanaPanelBackgroundImage"
        />
        {allCards.map((arcanaCard) => (
          <CardPanel
            key={arcanaCard}
            cardDetails={
              arcanaData != null
                ? buildArcanaDetails(arcanaCard, arcanaData.arcanaList)
                : { codeName: arcanaCard }
            }
          />
        ))}
      </div>
    </div>
  );
}

export default ArcanaPanel;
