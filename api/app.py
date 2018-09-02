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

# @app.route("/")
# def main():
# 	return render_template('index.html')

# if __name__ == "__main__":
# 	app.run(debug=True, host="0.0.0.0", port=80)

# tasks = [
#     {
#         'id': 1,
#         'title': u'Buy groceries',
#         'description': u'Milk, Cheese, Pizza, Fruit, Tylenol', 
#         'done': False
#     },
#     {
#         'id': 2,
#         'title': u'Learn Python',
#         'description': u'Need to find a good Python tutorial on the web', 
#         'done': False
#     }
# ]

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

	#todo success code 200, or relavant
	event = {
		'name': request.json['name'],
		'start_date': request.json['start_date'],
		'end_date': request.json['end_date']
	}
	event_id = db.events.insert(event)
	new_event = db.events.find_one({'_id': event_id})
	return dumps(new_event)
	# output = {
	# 	'name': new_event['name'], 
	# 	'start_date': new_event['start_date'],
	# 	'end_date': new_event['end_date']
	# }
	# return jsonify({'result' : output})

@app.route('/api/v1.0/event/<string:event_id>', methods=['DELETE'])
def update_event(event_id):
	# event_id = '"$oid": "5b8ae036fcc6ec3188e65685"'
	event = db.events.delete_many({'_id': ObjectId(event_id)})
	return jsonify({'result': True})



if __name__ == '__main__':
	# app.run(debug=True, host="0.0.0.0", port=80)
	app.run(debug=True)

