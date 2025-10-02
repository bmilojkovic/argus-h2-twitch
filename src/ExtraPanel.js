
import './css/ExtraPanel.css'

import BoonIcon from './BoonIcon';

function ExtraPanel({extraData}) {
  
  return (
    <div className="ExtraPanel">
      {extraData != null ? extraData.map(extraItem =>
        <BoonIcon key={extraItem.codeName} boonDetails={extraItem} lowPosition={true} isKeepsake={
          extraItem.extraType != null && extraItem.extraType == "Keepsake"
        } />
      ) : ""}
    </div>
  )
}

export default ExtraPanel;