import "../../css/ExtraPanel.css";

import BoonIcon from "../BoonIcon";

function ExtraPanel({ extraData }) {
  function extraItemValid(extraItem) {
    return (
      Object.hasOwn(extraItem, "codeName") &&
      Object.hasOwn(extraItem, "extraType")
    );
  }
  return (
    <div className="ExtraPanel">
      {extraData != null
        ? extraData.map((extraItem) =>
            extraItemValid(extraItem) ? (
              <BoonIcon
                key={extraItem.codeName}
                boonDetails={extraItem}
                displayType={
                  extraItem.extraType != null &&
                  extraItem.extraType == "Keepsake"
                    ? "Keepsake"
                    : "Boon"
                }
              />
            ) : (
              <div />
            )
          )
        : ""}
    </div>
  );
}

export default ExtraPanel;
