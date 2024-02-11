#!/usr/bin/python3
""" Starts a Flash Web Application """

from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
import uuid
from flask import Flask, render_template

app = Flask(__name__)

class State:
    def __init__(self, name, cities):
        self.name = name
        self.cities = cities

class Amenity:
    def __init__(self, name):
        self.name = name

class Place:
    def __init__(self, name):
        self.name = name

states_data = [
    State("California", ["Los Angeles", "San Francisco"]),
    State("New York", ["New York City", "Buffalo"]),
    State("Texas", ["Houston", "Austin"])
]

amenities_data = ["Wifi", "Pool", "Gym"]

places_data = ["Beach House", "City Apartment", "Mountain Cabin"]

@app.route('/101-hbnb/', strict_slashes=False)
def hbnb():
    """ Display the HBNB web page """
    states = []
    for state in states_data:
        cities = sorted(state.cities, key=lambda k: k)
        states.append([state, cities])

    amenities = sorted(amenities_data, key=lambda k: k)
    places = sorted(places_data, key=lambda k: k)

    return render_template('101-hbnb.html',
                           states=states,
                           amenities=amenities,
                           places=places, cache_id=uuid.uuid4())

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
