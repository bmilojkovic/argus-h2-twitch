function ArgusReducer(draft, action) {
  switch (action.type) {
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
      if (action.data.length > 3) {
        console.log("Got more than three pins. Ignoring the tail end.");
        action.data = action.data.slice(0, 3);
      }
      draft.pinData = action.data;
      break;
    case "vows":
      draft.vowData = action.data;
      break;
    case "arcana":
      draft.arcanaData = action.data;
      break;
    case "totalRunItems":
      draft.totalRunItems = action.data;
      break;
  }
}

export default ArgusReducer;
