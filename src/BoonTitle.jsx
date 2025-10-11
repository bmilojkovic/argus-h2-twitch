
import './css/BoonTitle.css'

function BoonTitle({boonTitle, rarity}) {
  const words = boonTitle.split(" ");
  
  return (
    <span className={`BoonTitle ${rarity}Text`}>{words.map((word,ind) => 
      <span key={`${ind}-${word}`}>
        <span className="TitleFirstLetter">{word.substring(0, 1)}</span>
        <span className="TitleOtherLetters">{word.substring(1, word.length)}</span>
        &nbsp;
      </span>
    )}</span>
  )
}

export default BoonTitle;