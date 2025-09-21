
import ReactHtmlParser from 'react-html-parser';

import './css/ElementPanel.css'

function ElementPanel({elementalData}) {
  const emptyElementalData = [
    {name: "Earth", value: 0},
    {name: "Water", value: 0},
    {name: "Air", value: 0},
    {name: "Fire", value: 0},
    {name: "Aether", value: 0}
  ];

  return (
    <div className="ElementPanel">
      {elementalData != null ? elementalData.map((element) =>
        <div className="ElementCell"><span>{ReactHtmlParser(element.value)}</span><img className="ElementImage" src={`img/Element_${element.name}.png`}/></div>
      )
      :
      emptyElementalData.map((element) =>
        <span><span>{element.value}</span><img className="ElementImage" src={`img/Element_${element.name}.png`}/>&nbsp;</span>
      )}
    </div>
  )
}

export default ElementPanel;