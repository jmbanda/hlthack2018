# Hospital Health Guard - HACK/HLTH hackathon 2018
![alt text](http://www.jmbanda.com/hhg-logo.png "")
## Team: 
Marc Enriquez, Juan M. Banda, David Jacob
### Description: 

According to research, the mobile health industry is expected to continue to grow in the coming years and is predicted to reach a total market size of [almost 60 billion dollars by 2020](https://www.statista.com/topics/2263/mhealth/). This paired with the fact that the mobile health app numbers almost doubled in the two years from 2015 to exceed 318,500, with more than 200 new apps launched every day, according to a [new report from IQVIA](http://www.pmlive.com/blogs/digital_intelligence/archive/2018/january/sharp_rise_in_mobile_health_app_numbers_1215229).

We decided to focus on a different aspect: Making a service and app the helps those in charge of helping others. With Hospital Health Guard we leverage the FitBit API and the Anthena Health API to help hospitals manage their most valuable resource: their clinicians. 

Our project has three main components: 
- A FitBit app used to collect data points from the clinicians, such as, but not limited to: resting heart rate, stride (walk - run), weight,  minutes active, calories, steps, etc. This app is also used to provide notifications to the clinician. 
- A corporate dashboard that allows administrators to see the current health status of their clinicians as well as recommendations for scheduling. This dashboard pulls data from the Athena Health API and uses it to generate scheduling/routing suggestions.
- A machine learning model that takes FitBit and Athena Health data as input and makes a prediction (based on data outside the ‘normal’ ranges) at any given time for the clinician’s fatigue levels. These predictions and then sent as messages to both the dashboard (for administrator review/action) and the clinician (to take a break). 

### What is next: 

The potential of the proof of concept work we did during this 24 hours is immense, we could enhance this technology to make fully automated decisions, completely automating the optimization process of scheduling based on fatigue levels of the clinicians and load. The system could incorporate location and distance features in the future to optimize the clinician’s area of coverage slowly reducing the amount of walking done by each and optimizing their output. 

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

