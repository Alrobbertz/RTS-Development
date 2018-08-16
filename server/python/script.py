# script.py
# Andrew Robbertz 08/16/18
import sys
import csv
import pymongo
from pymongo import MongoClient

year = "2018"
month = "05"
day = "15"
base_minute = 26
second = 0
ms = 0

header = []
session_name = sys.argv[1]
session_type = sys.argv[2]
filename = sys.argv[3]
ts = []
force_raw = []
angle_raw = []
force_adj = []
angle_adj = []

client = MongoClient(
    'mongodb://dev:development1@ds115762.mlab.com:15762/rts-development')
db = client['rts-development']  # CONNECT TO 'rts' DB
sessions = db['sessions']  # CONNECT TO readings collection

file_path = './uploads/' + filename
with open(file_path, "r") as input:
    for i in range(0, 7):
        header.append(input.readline())

    for line in csv.reader(input):  # READING IN CSV FILE
        hour = line[0]
        minute = int(base_minute + (second / 60))
        second = round(ms, 2)
        ms += .02

        ts.append("{0}-{1}-{2}T{3}:{4}:{5}".format(year,
                                                   month, day, hour, minute, second))
        force_raw.append(float(line[3]))
        angle_raw.append(float(line[4]))
        force_adj.append(float(line[5]))
        angle_adj.append(float(line[6]))

# TODO talk to daniel about the time and date format for headers
record_date = "{0}-{1}-{2}".format(year, month, day)
session = {
    "name": session_name,
    "record_date": record_date,
    "session_type": session_type,
    "ts": ts,
    "angle_raw": angle_raw,
    "force_raw": force_raw,
    "angle_adj": angle_adj,
    "force_adj": force_adj
}

sessions.insert_one(session)
print('Success!')
