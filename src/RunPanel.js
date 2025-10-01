
import "./css/RunPanel.css"

import ElementPanel from './ElementPanel'
import BoonIcon from './BoonIcon'
import ExtraPanel from './ExtraPanel'

function RunPanel({allBoons, weaponData, familiarData, elementalData, extraData}) {
    return (
        <div className="RunPanel">
            <div className="GridContainer">
                <img src="img/main_background.png" className="RunPanelBackgroundImage"/>
                <ElementPanel elementalData={elementalData} />
                {weaponData != null && weaponData.name != null ?
                    <BoonIcon boonDetails={weaponData}/>
                    : <div />}
                {familiarData != null && familiarData.name != null ?
                    <BoonIcon boonDetails={familiarData}/>
                    : <div />}
                <BoonIcon
                    boonDetails={"weaponBoon" in allBoons ? allBoons.weaponBoon : {codeName : "EmptyWeaponBoon", rarity : ""}}
                />
                <BoonIcon
                    boonDetails={"specialBoon" in allBoons ? allBoons.specialBoon : {codeName : "EmptySpecialBoon", rarity : ""}}
                />
                <BoonIcon
                    boonDetails={"castBoon" in allBoons ? allBoons.castBoon : {codeName : "EmptyCastBoon", rarity : ""}}
                />
                <BoonIcon
                    boonDetails={"sprintBoon" in allBoons ? allBoons.sprintBoon : {codeName : "EmptySprintBoon", rarity : ""}}
                />
                <BoonIcon
                    boonDetails={"manaBoon" in allBoons ? allBoons.manaBoon : {codeName : "EmptyManaBoon", rarity : ""}}
                />
                {allBoons.otherBoons != null ? allBoons.otherBoons.map((boon) => 
                    <BoonIcon key={boon.codeName} boonDetails={boon}/>      
                ) : ""}
                
            </div>
            {extraData != null ? <ExtraPanel extraData={extraData} /> : ""}
      </div>
    )
}

export default RunPanel;