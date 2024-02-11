$(document).ready(function () {
    const amenitiesId = {};
    const statesId = {};
    const citiesId = {};

    $('input[type="checkbox"]').click(function () {
        const id = $(this).attr('data-id');
        const name = $(this).attr('data-name');
        const type = $(this).attr('data-type');

        if ($(this).prop('checked')) {
            if (type === 'amenity')
                amenitiesId[id] = name;
            else if (type === 'state') {
                statesId[id] = name;
                $('ul.' + id).find('input[type="checkbox"]').prop('checked', true);
            }
            else
                citiesId[id] = name;
        } else {
            if (type === 'amenity')
                delete amenitiesId[id];
            else if (type === 'state') {
                delete statesId[id];
                $('ul.' + id).find('input[type="checkbox"]').prop('checked', false);
            }
            else
                delete citiesId[id];
        }

        let selectedLocations = Object.values(statesId).concat(Object.values(citiesId));
        $('.locations h4').text(selectedLocations.join(', '));

        $('.amenities h4').text(Object.values(amenitiesId).join(', '));
    });

    function getStatus() {
        $.get('http://localhost:5001/api/v1/status/', function (data) {
            if (data.status === 'OK')
                $('#api_status').addClass('available');
            else
                $('#api_status').removeClass('available');
        }).fail(function () {
            $('#api_status').removeClass('available');
        });
    }

    getStatus();
    setInterval(getStatus, 10000);

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
                        '<div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + place.max_guest + ' Guests</div>' +
                        '<div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + place.number_rooms + ' Bedrooms</div>' +
                        '<div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + place.number_bathrooms + ' Bathroom</div>' +
                        '</div>' +
                        '<div class="description">' + place.description + '</div>' +
                        '</article>'
                    );
                });
            }
        });
    });
});
