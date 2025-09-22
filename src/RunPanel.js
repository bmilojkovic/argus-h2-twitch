
import "./css/RunPanel.css"

import ElementPanel from './ElementPanel'
import BoonPanel from './BoonPanel'
import ExtraPanel from './ExtraPanel'

function RunPanel({allBoons, weaponData, familiarData, elementalData, extraData}) {
    return (
        <div className="RunPanel">
            <div className="GridContainer">
                <img src="img/main_background.png" className="RunPanelBackgroundImage"/>
                <ElementPanel elementalData={elementalData} />
                {weaponData != null && weaponData.name != null ?
                    <BoonPanel boonDetails={weaponData}/>
                    : <div />}
                {familiarData != null && familiarData.name != null ?
                    <BoonPanel boonDetails={familiarData}/>
                    : <div />}
                <BoonPanel
                    boonDetails={"weaponBoon" in allBoons ? allBoons.weaponBoon : {codeName : "EmptyWeaponBoon", rarity : ""}}
                />
                <BoonPanel
                    boonDetails={"specialBoon" in allBoons ? allBoons.specialBoon : {codeName : "EmptySpecialBoon", rarity : ""}}
                />
                <BoonPanel
                    boonDetails={"castBoon" in allBoons ? allBoons.castBoon : {codeName : "EmptyCastBoon", rarity : ""}}
                />
                <BoonPanel
                    boonDetails={"sprintBoon" in allBoons ? allBoons.sprintBoon : {codeName : "EmptySprintBoon", rarity : ""}}
                />
                <BoonPanel
                    boonDetails={"manaBoon" in allBoons ? allBoons.manaBoon : {codeName : "EmptyManaBoon", rarity : ""}}
                />
                {allBoons.otherBoons != null ? allBoons.otherBoons.map((boon) => 
                    <BoonPanel boonDetails={boon}/>      
                ) : ""}
                
            </div>
            {extraData != null ? <ExtraPanel extraData={extraData} /> : ""}
      </div>
    )
}

export default RunPanel;