
function ArgusReducer(draft, action) {
    switch(action.type) {
        case "allBoons":
            draft.allBoons = action.data;
            break;
        case "weapon":
            draft.weaponData = action.data;
            break;
        case "familiar":
            draft.familiarData = action.data;
            break;
        case "extra":
            draft.extraData = action.data;
            break;
        case "elemental":
            draft.elementalData = action.data;
            break;
        case "pin":
            draft.pinData = action.data;
            break;
    }

}

export default ArgusReducer;