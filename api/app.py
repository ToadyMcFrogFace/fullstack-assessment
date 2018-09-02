from flask import Flask, jsonify, request #render_template
from flask_cors import CORS
from pymongo import MongoClient
from pprint import pprint
from bson.json_util import dumps
from bson.objectid import ObjectId

client = MongoClient('localhost', 27017)
db = client.assessment
serverStatusResult = db.command("serverStatus")
pprint(serverStatusResult)

app = Flask(__name__)
CORS(app)

#Event Routes
@app.route('/api/v1.0/events', methods=['GET'])
def read_events():
	events = db.events.find()
	return dumps(events)

@app.route('/api/v1.0/event', methods=['POST'])
def create_event():
	# return jsonify({'request': request.json})
	if not request.json or not 'name' in request.json:
		abort(400)

	# sort geolocations by date
	geolocations = request.json['geolocations'];
	geolocations.sort(key=lambda x: x['date'].split('-'));

	# get start and end date from geolocations dates
	start_date = geolocations[0]['date'];
	end_date = geolocations[len(geolocations) -1]['date'];

	#todo success code 200, or relavant
	event = {
		'name': request.json['name'],
		'start_date': start_date,
		'end_date': end_date,
		'geolocations': []
	}

	for geolocation in geolocations:
		# geo = 
		event['geolocations'].append({
			'lat': geolocation['lat'],
			'long': geolocation['long'],
			'date': geolocation['date'],
			# todo: checkout for source
			'source': 'browser'
		});

	event_id = db.events.insert(event)
	new_event = db.events.find_one({'_id': event_id})
	return dumps(new_event)


@app.route('/api/v1.0/event/<string:event_id>', methods=['DELETE'])
def update_event(event_id):
	# event_id = '"$oid": "5b8ae036fcc6ec3188e65685"'
	event = db.events.delete_many({'_id': ObjectId(event_id)})
	return jsonify({'result': True})



if __name__ == '__main__':
	# app.run(debug=True, host="0.0.0.0", port=80)
	app.run(debug=True)

