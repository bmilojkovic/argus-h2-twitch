import { useState } from 'react';
import { useEffect } from 'react';

import './App.css';

function BoonPanel({boonName}) {
  
  return (
    <div className="BoonPanel">
      <img src={`img/${boonName}.png`} />
      
    </div>
  );
}

function App() {
  const [boons, setBoons] = useState("")
  const [isSubscribed, setSubscribed] = useState(false)

  useEffect(() => {
    if (!isSubscribed) {
      setSubscribed(true);
      var twitch = window.Twitch.ext;
      twitch.listen("broadcast", function(target, contentType, message) {
        setBoons(message);
        console.log(message);
      });
    }
  });
  

  return (
    <div className="App">
      <ul>
        {boons.split(" ").map((boon) => 
          <li>
            <BoonPanel boonName={boon} />      
          </li>
        )}
      </ul>
      
    </div>
  );
}

export default App;
