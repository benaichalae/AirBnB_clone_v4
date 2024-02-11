$(document).ready(function () {
    const amenitiesId = {};
    const statesId = {};
    const citiesId = {};

    // Listen for changes on amenities INPUT checkbox tags
    $('.amenities INPUT[type="checkbox"]').click(function () {
        const id = $(this).attr('data-id');
        const name = $(this).attr('data-name');

        if ($(this).prop('checked')) {
            amenitiesId[id] = name;
        } else {
            delete amenitiesId[id];
        }
        $('.amenities h4').text(Object.values(amenitiesId).join(', '));
    });

    // Listen for changes on states INPUT checkbox tags
    $('.locations h2 INPUT[type="checkbox"]').click(function () {
        const id = $(this).attr('data-id');
        const name = $(this).attr('data-name');

        if ($(this).prop('checked')) {
            statesId[id] = name;
            citiesId[id] = name;
        } else {
            delete statesId[id];
            delete citiesId[id];
        }
        $('.locations h4').text(Object.values(citiesId).join(', '));
    });

    // Listen for changes on cities INPUT checkbox tags
    $('.locations ul li ul INPUT[type="checkbox"]').click(function () {
        const id = $(this).attr('data-id');
        const name = $(this).attr('data-name');

        if ($(this).prop('checked')) {
            citiesId[id] = name;
        } else {
            delete citiesId[id];
        }
        $('.locations h4').text(Object.values(citiesId).join(', '));
    });

    // Function to get the API status and change class if not available
    const checkAPIStatus = function () {
        $.ajax({
            type: 'get',
            url: 'http://' + window.location.hostname + ':5001/api/v1/status/',
            timeout: 5000,
            success: function (status) {
                if (status.status === 'OK') {
                    $('DIV#api_status').addClass('available');
                } else {
                    $('DIV#api_status').removeClass('available');
                }
            },
            error: function () {
                $('DIV#api_status').removeClass('available');
            },
            complete: function () {
                setTimeout(checkAPIStatus, 10000);
            }
        });
    };
    checkAPIStatus();

    // Retrieve all places and create article tags with them
    const getPlaces = function () {
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: 'http://localhost:5001/api/v1/places_search/',
            data: '{}',
            dataType: 'json',
            success: function (places) {
                places.forEach(function (place) {
                    $('.places').append(
                        '<article>' +
                        '<div class="title_box">' +
                        '<h2>' + place.name + '</h2>' +
                        '<div class="price_by_night">$' + place.price_by_night + '</div>' +
                        '</div>' +
                        '<div class="information">' +
                        '<div class="max_guest"><br />' + place.max_guest + ' Guests</div>' +
                        '<div class="number_rooms"><br />' + place.number_rooms + ' Bedrooms</div>' +
                        '<div class="number_bathrooms"><br />' + place.number_bathrooms + ' Bathroom</div>' +
                        '</div>' +
                        '<div class="description">' + place.description + '</div>' +
                        '</article>'
                    );
                });
            }
        });
    };
    getPlaces();

    // Filter places by amenities, states, and cities on button search click
    $('button').click(function () {
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: 'http://localhost:5001/api/v1/places_search/',
            data: JSON.stringify({
                amenities: Object.keys(amenitiesId),
                states: Object.keys(statesId),
                cities: Object.keys(citiesId)
            }),
            dataType: 'json',
            success: function (places) {
                $('.places').empty();
                places.forEach(function (place) {
                    $('.places').append(
                        '<article>' +
                        '<div class="title_box">' +
                        '<h2>' + place.name + '</h2>' +
                        '<div class="price_by_night">$' + place.price_by_night + '</div>' +
                        '</div>' +
                        '<div class="information">' +
                        '<div class="max_guest"><br />' + place.max_guest + ' Guests</div>' +
                        '<div class="number_rooms"><br />' + place.number_rooms + ' Bedrooms</div>' +
                        '<div class="number_bathrooms"><br />' + place.number_bathrooms + ' Bathroom</div>' +
                        '</div>' +
                        '<div class="description">' + place.description + '</div>' +
                        '</article>'
                    );
                });
            }
        });
    });
});
