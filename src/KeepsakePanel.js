
import './css/KeepsakePanel.css'

import BoonPanel from './BoonPanel';

function KeepsakePanel({keepsakeData}) {
  return (
    <div className="KeepsakePanel">
      <BoonPanel boonDetails={keepsakeData} />
    </div>
  )
}

export default KeepsakePanel;