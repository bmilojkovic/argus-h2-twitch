import { useEffect, useState } from "react";

import App from "./App";
import "./css/ArgusDashboard.css";

import { argusBackend } from "./util";

function ArgusDashboard() {
  const [runInfoObject, setRunInfoObject] = useState([]);

  function fetchRunData() {
    try {
      const response = fetch(argusBackend + "/dashboard_run_data", {
        method: "GET",
      })
        .then((response) => response.text())
        .then((data) => {
          const newState = JSON.parse(data);
          console.log(newState);
          setRunInfoObject(newState);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setTimeout(fetchRunData, 5000);
  }, []);

  return (
    <div className="DashboardGrid">
      {runInfoObject != null && Object.keys(runInfoObject).length > 0
        ? Object.keys(runInfoObject).map((broadcasterId, ind) => {
            return (
              <div key={`DashboardItem${ind}`} className="DashboardItem">
                <h1 className="StreamerUsername">
                  <img
                    className="StreamerProfilePicture"
                    src={
                      runInfoObject[broadcasterId]["twitchProfile"][
                        "twitchProfilePic"
                      ]
                    }
                  ></img>
                  {
                    runInfoObject[broadcasterId]["twitchProfile"][
                      "twitchUsername"
                    ]
                  }
                </h1>
                <App
                  isDashboard={true}
                  dashboardInfo={JSON.stringify(
                    runInfoObject[broadcasterId]["runData"]
                  )}
                />
              </div>
            );
          })
        : ""}
    </div>
  );
}

export default ArgusDashboard;
