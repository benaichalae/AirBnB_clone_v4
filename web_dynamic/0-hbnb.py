#!/usr/bin/python3
""" Starts a Flask Web Application """

from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from flask import Flask, render_template
import uuid

app = Flask(__name__)

@app.route('/0-hbnb/', strict_slashes=False)
def hbnb():
    """ Display the main page of the HBNB web application """
    states = get_states()
    amenities = get_amenities()
    places = get_places()

    return render_template('0-hbnb.html',
                           states=states,
                           amenities=amenities,
                           places=places,
                           cache_id=uuid.uuid4())

def get_states():
    return [{'name': 'California', 'cities': ['Los Angeles', 'San Francisco']},
            {'name': 'New York', 'cities': ['New York City', 'Buffalo']},
            {'name': 'Texas', 'cities': ['Houston', 'Austin']}]

def get_amenities():
    return ['Wifi', 'Pool', 'Gym']

def get_places():
    return ['Beach House', 'City Apartment', 'Mountain Cabin']

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
