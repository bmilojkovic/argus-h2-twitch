import "../css/BoonTitle.css";

function TitleText({ text, rarity, textPositon, isMobile = false }) {
  return (
    <span className={`BoonTitle ${rarity}Text ${textPositon}Title`}>
      {text.map((word, ind) => (
        <span key={`${ind}-${word}`}>
          <span
            className={
              !isMobile ? "TitleFirstLetter" : "MobileTitleFirstLetter"
            }
          >
            {word.substring(0, 1)}
          </span>
          <span
            className={
              !isMobile ? "TitleOtherLetters" : "MobileTitleOtherLetters"
            }
          >
            {word.substring(1, word.length)}
          </span>
          &nbsp;
        </span>
      ))}
    </span>
  );
}

const weaponRarityMapping = {
  Common: "Rank I",
  Rare: "Rank II",
  Epic: "Rank III",
  Heroic: "Rank IV",
  Legendary: "Rank V",
  Perfect: "Rank VI",
};

function getRarityText(rarity, displayType) {
  switch (displayType) {
    case "Boon":
      return rarity;
    case "Weapon":
      return weaponRarityMapping[rarity];
    case "Familiar":
      return "Lv. " + rarity;
    default:
      return "Common";
  }
}

/*
displayType should be one of: Boon, Weapon, Keepsake
*/
function BoonTitle({
  boonTitle,
  rarity,
  displayType = "Boon",
  isMobile = false,
}) {
  const words = boonTitle.split(" ");

  return (
    <>
      <div>
        <TitleText
          text={words}
          rarity={rarity}
          textPositon="Left"
          isMobile={isMobile}
        />
        {!isMobile ? (
          displayType === "Keepsake" ? (
            <img
              className="RarityImage RightTitle"
              src={`img/KeepsakeFrame${rarity}.png`}
            />
          ) : (
            <TitleText
              text={[getRarityText(rarity, displayType)]}
              rarity={rarity}
              textPositon="Right"
              isMobile={isMobile}
            />
          )
        ) : (
          ""
        )}
      </div>
      <div style={{ clear: "both" }}></div>
    </>
  );
}

export default BoonTitle;
