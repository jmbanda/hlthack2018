import * as messaging from "messaging";
import { settingsStorage } from "settings";

// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("Companion Socket Open");
};

// Message socket closes
messaging.peerSocket.onclose = () => {
  console.log("Companion Socket Closed");
};

messaging.peerSocket.onmessage = (evt) => {
  const apiKey = JSON.parse(settingsStorage.getItem('apiKey'));

  if(apiKey) {
    fetch('https://u3wod5o9p5.execute-api.us-west-2.amazonaws.com/prod/device/tick', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        providerid: apiKey.name,
        date: new Date(),
        ...evt.data
      })
    })
      .then(data => {})
      .catch(error => console.error(error));
  }
};

function getNotifications() {
  const apiKey = JSON.parse(settingsStorage.getItem('apiKey'));

  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN && apiKey) {
    fetch('https://u3wod5o9p5.execute-api.us-west-2.amazonaws.com/prod/device/notifications?providerid=' + apiKey.name)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      const messages = data.notifications.map(m => m.message);
      if(messages.length>0) {
        messaging.peerSocket.send({type: 'notification', messages});
      }
    })
    .catch(function(error) {
      console.error(error);
    });
  }
}

setInterval(getNotifications, 2 * 1000);
