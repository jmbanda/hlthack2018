# Hospital Health Guard - HACK/HLTH hackathon 2018
![alt text](http://www.jmbanda.com/hhg-logo.png "")
## Team: 
Marc Enriquez, Juan M. Banda, David Jacob
### Description: 

### What is next: 

### Technology Stack
![alt text](http://www.jmbanda.com/fitbit-logo.png "")
![alt text](http://www.jmbanda.com/athena-logo.png "")
![alt text](http://www.jmbanda.com/sklearn-logo.png "")
![alt text](http://www.jmbanda.com/python-logo.png "")
![alt text](http://www.jmbanda.com/flask-logo.png "")
![alt text](http://www.jmbanda.com/meteor-logo.png "")
![alt text](http://www.jmbanda.com/mongodb.png "")

### Project architecture
- FitBit OS for FitbitApp
- Python/Flash/SciKitLearn for Machine Learning functionality
- Meteor.js for Hospital analytics and messaging dashboard

### Hackathon APIs used
- Fitbit API
- Athena API

### Workflow
1. All clinical staff is provided with a fitbit device to collect their information available from the device (age, bmr, gender, height (meters), restingHeartRate (bpm), stride (walk - run), weight (kgs),  activeMinutes, calories, distance, elevationGain, steps.
2. We combine the fitbit data with the clinician/provider schedule pulled from AthenaAPI.
Based on these variables and a few manually crafted features (appointments/hours of work prior and ‘following’) we trained a machine learning model to determine if the doctor will be overworked/tired at a given point in time. 
3. With the model’s prediction, we then route messages to hospital admins and the doctor in order to help him avoid fatigue and for the administrator to change their workload. This will allow for better and in the future automated management of staff and their fatigue. 
4. After collecting more and more data, the model can be fitted better and could help drive automatic decisions in the future.

