import "./css/BoonTitle.css";

function TitleText({ text, rarity, textPositon }) {
  return (
    <span className={`BoonTitle ${rarity}Text ${textPositon}Title`}>
      {text.map((word, ind) => (
        <span key={`${ind}-${word}`}>
          <span className="TitleFirstLetter">{word.substring(0, 1)}</span>
          <span className="TitleOtherLetters">
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
    case "boon":
      return rarity;
    case "weapon":
      return weaponRarityMapping[rarity];
    default:
      return "Common";
  }
}

/*
displayType should be one of: boon, weapon, keepsake
*/
function BoonTitle({ boonTitle, rarity, displayType = "boon" }) {
  const words = boonTitle.split(" ");

  return (
    <>
      <div>
        <TitleText text={words} rarity={rarity} textPositon="Left" />
        {displayType === "keepsake" ? (
          <img
            className="RarityImage RightTitle"
            src={`img/KeepsakeFrame${rarity}.png`}
          />
        ) : (
          <TitleText
            text={[getRarityText(rarity, displayType)]}
            rarity={rarity}
            textPositon="Right"
          />
        )}
      </div>
      <div style={{ clear: "both" }}></div>
    </>
  );
}

export default BoonTitle;
