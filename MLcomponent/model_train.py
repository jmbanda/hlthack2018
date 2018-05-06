# Stand-alone training 
import sys
import os
import shutil
import time
import traceback
import json

from flask import Flask, request, jsonify
import pandas as pd
from sklearn.externals import joblib
from sklearn.ensemble import RandomForestClassifier as rf

global model_columns
global clf

# inputs
training_data = 'data/DatasetLoadHackHLTH.csv'
include = ['age','bmr','height','restingHR','strideW','strideR','weight','activeM','calories','distance','elevationGain','steps','totalApptBSS2N','apptDurSS2N','totalApptN2SE','apptDurN2SE']
dependent_variable = ['Outcome']

model_directory = 'model'
model_file_name = '%s/model.pkl' % model_directory
model_columns_file_name = '%s/model_columns.pkl' % model_directory

# These will be populated at training time
model_columns = None
clf = None

df = pd.read_csv(training_data)
df_ = df[include]

x = df_
y = df[dependent_variable]

model_columns = list(x.columns)
joblib.dump(model_columns, model_columns_file_name)
clf = rf()
start = time.time()
clf.fit(x, y)
print 'Trained in %.1f seconds' % (time.time() - start)
print 'Model training score: %s' % clf.score(x, y)
joblib.dump(clf, model_file_name)


data = [{"age": 68,"bmr": 1953,"height":1.9,"restingHR":61,"strideW":104,"strideR":132,"weight":152,"activeM":178,"calories":1098,"distance":2.9,"elevationGain":28,"steps":17902,"totalApptBSS2N":1.2,"apptDurSS2N":39.6,"totalApptN2SE":12,"apptDurN2SE":362.4}]
data_json = json.dumps(data)

query = pd.read_json(data_json)
print query

query = query.reindex(columns=model_columns, fill_value=0)

prediction = list(clf.predict(query))

print prediction


