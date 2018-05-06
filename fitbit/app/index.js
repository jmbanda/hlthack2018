import * as messaging from "messaging";
import { today } from "user-activity";
import { user } from "user-profile";
import { HeartRateSensor } from "heart-rate";
import document from "document";

var hrm = new HeartRateSensor();

hrm.onreading = function() {
  messaging.peerSocket.send({
    activity: {
      activeMinutes: today.local.activeMinutes,
      calories: today.local.calories,
      distance: today.local.distance,
      elevationGain: today.local.elevationGain,
      steps: today.local.steps
    },
    profile: {
      bmr: user.bmr,
      restingHeartRate: user.restingHeartRate,
      stride: {
        walk: user.stride.walk,
        run: user.stride.run
      },
      weight: user.weight
    },
    heartRate: hrm.heartRate
  });

  hrm.stop();
};

// Message socket opens
messaging.peerSocket.onopen = () => {
  sendData();
  console.log("App Socket Open");
};

// Message socket closes
messaging.peerSocket.onclose = () => {
  console.log("App Socket Closed");
};

messaging.peerSocket.onmessage = (evt) => {
  if(evt.data.type=='notification') {
    document.getElementById("messages").text = evt.data.messages[0];
    document.getElementById("background").style.fill = "red";
    setTimeout(() => {
      document.getElementById("messages").text = "Hospital Health Guard";
      document.getElementById("background").style.fill = "black";
    }, 5000);
  }
};

function sendData() {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    hrm.start();
  }
}

setInterval(sendData, 60 * 1 * 1000);
