import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useImmerReducer } from "use-immer";

import "../css/App.css";
import RunPanel from "./run/RunPanel";
import PinPanel from "./pins/PinPanel";
import ArcanaPanel from "./arcana/ArcanaPanel";
import VowPanel from "./vows/VowPanel";

import ArgusReducer from "./Reducer";

/*
  This is the main entry point for the application. Here is an outline of the app structure:
  -This component handles listening to broadcasts from our backend, assembles the messages and
  stores them in a state object.
  -The state is maintained by Reducer.jsx
  -The UI is laid out in the following way:
  --There are four tabs that are contained in this component: Run, Arcana, Vow, Pins
  --Each of the tabs has its own respective Panel component that is the entry point for that tab
  --RunPanel has an additional panel at the bottom called ExtraPanel
  --The helper components used throughout the panels are:
  ---BoonIcon - represents a boon. Used in RunPanel, ExtraPanel and PinPanel.
  ---CardPanel - represents an arcana card. Used in ArcanaPanel.
  ---VowIcon - represents a vow. Used in VowPanel.
  ---SmartImage - a replacement for <img> that can have a fallback image if the dynamic one fails.

  Alternate entry points for the application are:
  -ConfigPage - the main configuration page for the extension. Checks if the user is logged in on
  the backend and prompts them to do so if they haven't.
*/
function App({ isDashboard = false, dashboardInfo = null, isMobile = false }) {
  const [activeTab, setActiveTab] = useState("runTab");

  /*
    we use one state object to hold our entire state
    for now we actually always get all of these properties in an update
    in the future we might make things more granular
  */
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

  /*
    a 'message' is part of a broadcast from the backend. we make sure
    that this message is always <5KB to ensure that we don't hit
    the limit imposed by twitch.

    each broadcast will have a unique nonce attached to it. so all messages
    that are part of a broadcast will share that nonce, and have an index
    number.

    we need to know which messages arrived, but also we need to know
    past broadcasts cause there is a chance that we receive a message
    from a historic broadcast that we should ignore.

    essentially the plan for when a new message arrives is:
    1. look through this message history to see if it is historic
    (it will have 'archived' set to true). in that case - we ignore
    2. if we find other messages with the same nonce that are not
    historic, then we are on the path to assembling the full broadcast.
    we just keep those. we also check if all parts have arrived in which
    case the entire broadcast is ready for assembling and display
    3. if we don't find other messages with the same nonce then this is the
    start of a new broadcast. archive the currently active message and just
    keep this one. if it is the only message in the broadcast we display it.
  */
  const messageHistory = useRef([]);

  /*
    this is the function we call when we have the full broadcast assembled.
  */
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

  /*
    this function handles a single message part according to the strategy
    outlined above the messageHistory array.
  */
  function addMessagePart(nonce, partInd, totalParts, partData) {
    var foundNonce = false;

    // go through entire history
    messageHistory.current.forEach((oldMessage) => {
      if (oldMessage.nonce === nonce) {
        foundNonce = true;
        if (oldMessage.archived) {
          //this is part of an archived message. don't care about it.
          return;
        }

        //after this if, we know that this part belongs to the latest broadcast

        //sanity check
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
      const MAX_HISTORY_SIZE = 10;

      //message is new. archive the rest, and make this the primary one
      messageHistory.current.forEach((oldMessage) => {
        oldMessage.archived = true;
      });

      var newMessage = {
        nonce: nonce,
        totalParts: totalParts,
        parts: {},
        archived: false,
      };
      newMessage.parts[partInd] = partData;
      messageHistory.current.push(newMessage);

      //ensure that messageHistory doesn't get overly large
      //we are removing the oldest messages from the queue
      while (messageHistory.current.length > MAX_HISTORY_SIZE) {
        messageHistory.current.shift();
      }

      //if there are no other parts, we good.
      if (newMessage.totalParts === 1) {
        updateState(partData);
      }
    }
  }

  /*
    helper function to read our message header. since all tokens are separated by the
    * symbol, this function looks for the first * from startInd and returns everything in between

    we use this only for the header params - the final message will just be at the end

    this function returns two values:
    -the searched string
    -the ending index (position of next *)
  */
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

  /*
    messages arrive in the following format:
    *NONCE*PART_INDEX*TOTAL_PARTS*MESSAGE
  */
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

  /*
    subscribing to updates from our backend
  */
  useEffect(() => {
    if (!isDashboard) {
      var twitch = window.Twitch.ext;
      twitch.listen("broadcast", twitchListen);
    } else {
      if (dashboardInfo != null) {
        updateState(JSON.stringify(dashboardInfo));
      }
    }
  }, [dashboardInfo]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className={!isMobile ? "App" : "MobileApp"}>
      <div className={!isMobile ? "AppBackground" : "MobileAppBackground"} />
      <div className={"TabList " + (isMobile ? "MobileTabList" : "")}>
        <div
          className={
            "TabButton RunTabButton " +
            (activeTab === "runTab" ? "ActiveTabButton " : "") +
            (isMobile ? "MobileTabButton" : "")
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
            "TabButton ArcanaTabButton " +
            (activeTab === "arcanaTab" ? "ActiveTabButton " : "") +
            (isMobile ? "MobileTabButton" : "")
          }
          onClick={() => handleTabClick("arcanaTab")}
        >
          <img src="img/arcana_tab_icon.png" className="TabButtonImage" />
          <span className="TabButtonText">
            {state.arcanaData != null &&
            Object.hasOwn(state.arcanaData, "totalGrasp")
              ? state.arcanaData.totalGrasp
              : "0"}
          </span>
        </div>

        <div
          className={
            "TabButton VowTabButton " +
            (activeTab === "vowTab" ? "ActiveTabButton " : "") +
            (isMobile ? "MobileTabButton" : "")
          }
          onClick={() => handleTabClick("vowTab")}
        >
          <img src="img/vow_tab_icon.png" className="TabButtonImage" />
          <span className="TabButtonText">
            {state.vowData != null && Object.hasOwn(state.vowData, "totalFear")
              ? state.vowData.totalFear
              : "0"}
          </span>
        </div>

        {state.pinData != null && state.pinData.length > 0 ? (
          <div
            className={
              "TabButton PinTabButton " +
              (activeTab === "pinTab" ? "ActiveTabButton " : "") +
              (isMobile ? "MobileTabButton" : "")
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
            isMobile={isMobile}
          />
        )}
        {activeTab === "arcanaTab" && (
          <ArcanaPanel arcanaData={state.arcanaData} isMobile={isMobile} />
        )}
        {activeTab === "vowTab" && (
          <VowPanel vowData={state.vowData} isMobile={isMobile} />
        )}
        {activeTab === "pinTab" && (
          <PinPanel pinBoons={state.pinData} isMobile={isMobile} />
        )}
      </div>
    </div>
  );
}

export default App;
