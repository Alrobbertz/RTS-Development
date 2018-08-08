# script.py 
# Andrew Robbertz 06/26/2018
import sys
import csv
import pymongo
from pymongo import MongoClient

client = MongoClient()
db = client['rts']  # CONNECT TO 'rts' DB
sessions = db['sessions']  # CONNECT TO readings collection

header = []
session_name = sys.argv[1];
session_type = sys.argv[2];
filename = sys.argv[3];
year = "2018"
month = "05"
day = "15"
ms = 0
ts = []
force_raw = []
angle_raw = []
force_adj = []
angle_adj = []

file_path = './uploads/' + filename;
with open(file_path, "r") as input:
    for i in range(0, 7):
        header.append(input.readline())

    for line in csv.reader(input):  # READING IN CSV FILE
        hour = line[0]
        minute = line[1]
        second = round(ms, 2)
        ms += .02
        ts.append("{0}-{1}-{2}T{3}:{4}:{5}Z".format(year, month, day, hour, minute, second))
        force_raw.append(float(line[3]))
        angle_raw.append(float(line[4]))
        force_adj.append(float(line[5]))
        angle_adj.append(float(line[6]))

record_date = "{0}-{1}-{2}".format(year, month, day)  # TODO talk to daniel about the time and date format for headers
session = {
        "name": session_name,
        "record_date": record_date,
        "session_type": "Test",
        "ts": ts,
        "angle_raw": angle_raw,
        "force_raw": force_raw,
        "angle_adj": angle_adj,
        "force_adj": force_adj
    }

with open("data.json", "w") as output:
    #print(session)
    output.write('{}\n'.format(session))
    sessions.insert_one(session)

print('Success!')