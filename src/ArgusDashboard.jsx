import { useEffect, useState, useRef } from "react";

import App from "./App";
import "./css/ArgusDashboard.css";

import { argusBackend } from "./util";
import { useInterval } from "./UseInterval";

function ArgusDashboard() {
  const [runInfoObject, setRunInfoObject] = useState({});

  function fetchRunData() {
    try {
      const response = fetch(argusBackend + "/dashboard_run_data", {
        method: "GET",
      })
        .then((response) => response.text())
        .then((data) => {
          let newData = JSON.parse(data);
          setRunInfoObject(newData);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchRunData();
  }, []);

  useInterval(() => {
    fetchRunData();
  }, 5000);

  return (
    <div className="DashboardGrid">
      {runInfoObject != null && Object.keys(runInfoObject).length > 0
        ? Object.keys(runInfoObject).map((broadcasterId, ind) => {
            return (
              <div key={`DashboardItem${ind}`} className="DashboardItem">
                <h1 className="StreamerUsername">
                  <a
                    href={`https://twitch.tv/${runInfoObject[broadcasterId]["twitchProfile"]["twitchUsername"]}`}
                  >
                    <img
                      className="StreamerProfilePicture"
                      src={
                        runInfoObject[broadcasterId]["twitchProfile"][
                          "twitchProfilePic"
                        ]
                      }
                    ></img>
                    &nbsp;
                    {
                      runInfoObject[broadcasterId]["twitchProfile"][
                        "twitchUsername"
                      ]
                    }
                  </a>
                </h1>
                <App
                  isDashboard={true}
                  dashboardInfo={runInfoObject[broadcasterId]["runData"]}
                />
              </div>
            );
          })
        : ""}
    </div>
  );
}

export default ArgusDashboard;
