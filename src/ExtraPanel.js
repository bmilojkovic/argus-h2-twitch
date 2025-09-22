
import './css/ExtraPanel.css'

import BoonPanel from './BoonPanel';

function ExtraPanel({extraData}) {
  return (
    <div className="ExtraPanel">
      {extraData.map(extraItem =>
        <BoonPanel boonDetails={extraItem} lowPosition={true} />
      )}
    </div>
  )
}

export default ExtraPanel;