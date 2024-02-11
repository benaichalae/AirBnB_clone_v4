$(document).ready(function () {
    // Object to store selected amenities' ids and names
    const amenitiesId = {};

    // Function to update amenities text
    const updateAmenitiesText = function () {
        $('.amenities h4').text(Object.values(amenitiesId).join(', '));
    };

    // Function to handle checkbox click event
    $('INPUT[type="checkbox"]').click(function () {
        const id = $(this).attr('data-id');
        const name = $(this).attr('data-name');

        if ($(this).prop('checked')) {
            // Add the selected amenity to the amenitiesId object
            amenitiesId[id] = name;
        } else {
            // Remove the deselected amenity from the amenitiesId object
            delete amenitiesId[id];
        }

        // Update the text of the '.amenities h4' element to display the selected amenities
        updateAmenitiesText();
    });

    // Function to get API status and update UI
    const updateApiStatus = function () {
        $.ajax({
            type: 'GET',
            url: `http://${window.location.hostname}:5001/api/v1/status/`,
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
                setTimeout(updateApiStatus, 10000);
            }
        });
    };

    // Call the function to update API status
    updateApiStatus();

    // Function to retrieve places and create article tags
    const getPlaces = function () {
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: 'http://localhost:5001/api/v1/places_search/',
            data: '{}',
            dataType: 'json',
            success: function (places) {
                $.each(places, function (index, place) {
                    $('.places').append(
                        `<article>
                            <div class="title_box">
                                <h2>${place.name}</h2>
                                <div class="price_by_night">${place.price_by_night}</div>
                            </div>
                            <div class="information">
                                <div class="max_guest"><br />${place.max_guest} Guests</div>
                                <div class="number_rooms"><br />${place.number_rooms} Bedrooms</div>
                                <div class="number_bathrooms"><br />${place.number_bathrooms} Bathroom</div>
                            </div>
                            <div class="description">${place.description}</div>
                        </article>`
                    );
                });
            }
        });
    };

    // Call the function to get places
    getPlaces();
});
