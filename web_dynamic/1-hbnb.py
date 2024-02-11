#!/usr/bin/python3
""" Starts a Flask Web Application """

from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from flask import Flask, render_template
import uuid
import random

app = Flask(__name__)

class State:
    def __init__(self, name, cities):
        self.name = name
        self.cities = cities

states_data = [
    State("California", ["Los Angeles", "San Francisco"]),
    State("New York", ["New York City", "Buffalo"]),
    State("Texas", ["Houston", "Austin"])
]

amenities_data = ["Wifi", "Pool", "Gym"]

places_data = ["Beach House", "City Apartment", "Mountain Cabin"]

@app.route('/1-hbnb/', strict_slashes=False)
def hbnb():
    """ Display the main page of the HBNB web application """
    states = []
    for state in states_data:
        cities = sorted(state.cities, key=lambda k: k)
        states.append([state, cities])

    amenities = sorted(amenities_data, key=lambda k: k)
    places = sorted(places_data, key=lambda k: k)

    return render_template('1-hbnb.html',
                           states=states,
                           amenities=amenities,
                           places=places,
                           cache_id=str(uuid.uuid4()))

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
