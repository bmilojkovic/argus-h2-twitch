import "./css/ConfigPage.css";

import { useState, useEffect } from "react";

function ConfigPage() {
  const [isFailed, setFailed] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isChecking, setChecking] = useState(true);

  //const argusBackend = "http://localhost:3000";
  const argusBackend = "https://argus-h2-backend.fly.dev";

  useEffect(() => {
    window.Twitch.ext.onAuthorized(function (auth) {
      try {
        const response = fetch(argusBackend + "/check_login", {
          method: "GET",
          headers: {
            "x-extension-jwt": auth.token,
          },
        })
          .then((response) => response.text())
          .then((data) => {
            setChecking(false);
            setLoggedIn(data === "LOGIN_OK");
          });
      } catch (error) {
        setFailed(true);
        setChecking(false);
      }
    });
  }, []);

  return (
    <>
      <div className="ConfigPage">
        {isChecking ? (
          <h1>Checking argus login... 👀</h1>
        ) : isFailed ? (
          <h1>Something went wrong on our end. Please try again later. 👀</h1>
        ) : isLoggedIn ? (
          <>
            <h1>All good. 👀</h1>
            <p>
              We have confirmed that your mod has gone through a successful
              connection with your Twitch account. You don't need to configure
              anything else.
            </p>
            <p>
              To check if everything looks good, go to the "Stream Manager" tab
              on Twitch and click the live preview button for Argus. It is very
              easy to find - it will have our icon 👀. When you click on it, a
              window with a preview will pop up. You <b>do not</b> have to be
              live to perform this check.
            </p>
            <p>
              Keep in mind that the data refreshes only during runs,
              specifically <b>when you exit a room</b>. So if you want to see
              things change, you will need to start a run and complete at least
              one encounter.
            </p>
            <h1>Have fun streaming with Argus!</h1>
          </>
        ) : (
          <>
            <h1>Need to connect from the game. 👀</h1>
            <p>
              It looks like you have not connected your Twitch account with
              Argus yet. :(
            </p>
            <p>
              <b>Install the mod.</b> You must have the Argus mod for Hades II
              installed to continue. We suggest using{" "}
              <a href="https://thunderstore.io/package/ebkr/r2modman/">
                r2modman
              </a>{" "}
              as the modmanager, as Argus is published through Thunderstore.
              Once you have r2modman installed, just search for Argus inside the
              Hades II category and follow the steps outlined in the mod
              manager.
            </p>
            <p>
              <b>Twitch connection.</b> To connect your Twitch account with
              Argus, simply run the game with the mod installed. While the game
              is starting, a browser window will pop up asking you to give Argus
              permission to access your basic profile information. We use this
              process to ensure that streamers can not be impersonated in our
              system.
            </p>
            <p>
              After you connect your account once successfully we will not ask
              you to do it again, at least until the next update of the mod
              itself.
            </p>
          </>
        )}
      </div>
    </>
  );
}

export default ConfigPage;
