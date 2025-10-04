import { useState } from "react";
import { useEffect } from "react";
import { useImmerReducer } from "use-immer";

import "./css/App.css";
import RunPanel from "./RunPanel";
import PinPanel from "./PinPanel";
import ArcanaPanel from "./ArcanaPanel";
import VowPanel from "./VowPanel";

import ArgusReducer from "./Reducer";

function App() {
  const [activeTab, setActiveTab] = useState("runTab");

  const [state, dispatch] = useImmerReducer(ArgusReducer, {
    allBoons: {},
    weaponData: null,
    familiarData: null,
    elementalData: [],
    extraData: null,
    pinData: null,
    arcanaData: null,
    vowData: null,
    totalRunItems: "0",
  });

  var messageHistory = [];

  function updateState(fullMessage) {
    var runData = JSON.parse(fullMessage);

    //console.log(fullMessage);

    if (runData.boonData != null) {
      dispatch({ type: "allBoons", data: runData.boonData });
    }
    if (runData.weaponData != null) {
      dispatch({ type: "weapon", data: runData.weaponData });
    }
    if (runData.familiarData != null) {
      dispatch({ type: "familiar", data: runData.familiarData });
    }
    if (runData.extraData != null) {
      dispatch({ type: "extra", data: runData.extraData });
    }
    if (runData.elementalData != null) {
      dispatch({ type: "elemental", data: runData.elementalData });
    }
    if (runData.pinData != null) {
      dispatch({ type: "pin", data: runData.pinData });
    }
    if (runData.vowData != null) {
      dispatch({ type: "vows", data: runData.vowData });
    }
    if (runData.arcanaData != null) {
      dispatch({ type: "arcana", data: runData.arcanaData });
    }
    if (runData.totalRunItems != null) {
      dispatch({ type: "totalRunItems", data: runData.totalRunItems });
    }
  }

  function addMessagePart(nonce, partInd, totalParts, partData) {
    var foundNonce = false;

    messageHistory.forEach((oldMessage) => {
      if (oldMessage.nonce === nonce) {
        foundNonce = true;
        if (oldMessage.archived) {
          return;
        }

        if (!(partInd in oldMessage.parts)) {
          //add part
          oldMessage.parts[partInd] = partData;

          if (Object.keys(oldMessage.parts).length === oldMessage.totalParts) {
            //all parts of a non-archived message have arrived
            var fullMessage = "";

            for (var i = 0; i < oldMessage.totalParts; i++) {
              fullMessage += oldMessage.parts[i];
            }

            updateState(fullMessage);
          }
        }
      }
    });

    if (!foundNonce) {
      //message is new. archive the rest, and make this the primary one
      messageHistory.forEach((oldMessage) => {
        oldMessage.archived = true;
      });

      var newMessage = {
        nonce: nonce,
        totalParts: totalParts,
        parts: {},
        archived: false,
      };
      newMessage.parts[partInd] = partData;
      messageHistory.push(newMessage);

      if (newMessage.totalParts === 1) {
        updateState(partData);
      }
    }
  }

  function parseArgusMessageParam(message, startInd, partName) {
    var paramEndPosition = message.indexOf("*", startInd);
    if (paramEndPosition === -1) {
      console.log(
        "Got message in bad format. Couldn't find end " + partName + " star."
      );
      return [null, null];
    }
    var valueToReturn = parseInt(message.substring(startInd, paramEndPosition));
    if (Number.isNaN(valueToReturn)) {
      console.log("Got message in bad format. Couldn't parse " + partName);
      return [null, null];
    }

    return [valueToReturn, paramEndPosition];
  }

  function twitchListen(target, contentType, message) {
    if (!message.startsWith("*")) {
      console.log("Got message in bad format. Missing initial star.");
      return;
    }
    var [nonce, nonceEnd] = parseArgusMessageParam(message, 1, "nonce");
    if (nonce == null) {
      return;
    }
    var [partInd, partIndEnd] = parseArgusMessageParam(
      message,
      nonceEnd + 1,
      "part index"
    );
    if (partInd == null) {
      return;
    }
    var [totalParts, totalPartsEnd] = parseArgusMessageParam(
      message,
      partIndEnd + 1,
      "total parts"
    );
    if (totalParts == null) {
      return;
    }

    var partData = message.substring(totalPartsEnd + 1);

    addMessagePart(nonce, partInd, totalParts, partData);
  }

  useEffect(() => {
    var twitch = window.Twitch.ext;
    twitch.listen("broadcast", twitchListen);
  }, []);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="App">
      <div className="AppBackground" />
      <div className="TabList">
        <div
          className={
            activeTab === "runTab"
              ? "RunTabButton ActiveTabButton"
              : "RunTabButton"
          }
          onClick={() => handleTabClick("runTab")}
        >
          <img src="img/boon_tab_icon.png" className="TabButtonImage" />
          <span className="TabButtonText">
            {state.totalRunItems != null ? state.totalRunItems : "0"}
          </span>
        </div>

        <div
          className={
            activeTab === "arcanaTab"
              ? "ArcanaTabButton ActiveTabButton"
              : "ArcanaTabButton"
          }
          onClick={() => handleTabClick("arcanaTab")}
        >
          <img src="img/arcana_tab_icon.png" className="TabButtonImage" />
          <span className="TabButtonText">
            {state.arcanaData != null ? state.arcanaData.totalGrasp : "0"}
          </span>
        </div>

        <div
          className={
            activeTab === "vowTab"
              ? "VowTabButton ActiveTabButton"
              : "VowTabButton"
          }
          onClick={() => handleTabClick("vowTab")}
        >
          <img src="img/vow_tab_icon.png" className="TabButtonImage" />
          <span className="TabButtonText">
            {state.vowData != null ? state.vowData.totalFear : "0"}
          </span>
        </div>

        {state.pinData != null && state.pinData.length > 0 ? (
          <div
            className={
              activeTab === "pinTab"
                ? "PinTabButton ActiveTabButton"
                : "PinTabButton"
            }
            onClick={() => handleTabClick("pinTab")}
          >
            <img src="img/pin_tab_icon.png" className="TabButtonImage" />
            <span className="TabButtonText">
              {state.pinData != null ? state.pinData.length : "0"}
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="TabbedContent">
        {activeTab === "runTab" && (
          <RunPanel
            allBoons={state.allBoons}
            weaponData={state.weaponData}
            familiarData={state.familiarData}
            elementalData={state.elementalData}
            extraData={state.extraData}
          />
        )}
        {activeTab === "arcanaTab" && (
          <ArcanaPanel arcanaData={state.arcanaData} />
        )}
        {activeTab === "vowTab" && <VowPanel vowData={state.vowData} />}
        {activeTab === "pinTab" && <PinPanel pinBoons={state.pinData} />}
      </div>
    </div>
  );
}

export default App;
