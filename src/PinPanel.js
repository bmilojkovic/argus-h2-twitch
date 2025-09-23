
import './css/PinPanel.css'

import BoonPanel from './BoonPanel'

function PinPanel({pinBoons}) {
    return (
        <div className="PinPanel">
            <div className="GridContainer">
                <h1 className="PinPanelTitle">These are the boons that we are going for.</h1>
                <img src="img/main_background.png" className="PinPanelBackgroundImage"/>
                {pinBoons != null ? pinBoons.map((boon) => 
                    <BoonPanel boonDetails={boon}/>      
                ) : ""}
                
            </div>
      </div>
    )
}

export default PinPanel;