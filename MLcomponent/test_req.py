# This file is used to test the model POST to get a prediction back
import requests
import json

data = [{"age": 68,"bmr": 1953,"height":1.9,"restingHR":61,"strideW":104,"strideR":132,"weight":152,"activeM":178,"calories":1098,"distance":2.9,"elevationGain":28,"steps":17902,"totalApptBSS2N":1.2,"apptDurSS2N":39.6,"totalApptN2SE":12,"apptDurN2SE":362.4}]
data_json = json.dumps(data)
headers = {'Content-type': 'application/json'}

response = requests.post("http://0.0.0.0:8089/predict", data=data_json, headers=headers)
print response.text