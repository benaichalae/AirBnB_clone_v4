$(document).ready(function () {
    const apiUrl = 'http://' + window.location.hostname + ':5001/api/v1/status/';

    // Function to check the API status and update the UI accordingly
    const checkApiStatus = function () {
        $.get(apiUrl, function (response) {
            if (response.status === 'OK') {
                $('#api_status').addClass('available');
            } else {
                $('#api_status').removeClass('available');
            }
        });
    };

    // Call the function to check API status initially
    checkApiStatus();

    // Object to store selected amenities' ids and names
    const amenities = {};

    // Function to handle checkbox change event
    $('INPUT[type="checkbox"]').change(function () {
        const id = $(this).attr('data-id');
        const name = $(this).attr('data-name');

        if ($(this).is(':checked')) {
            amenities[id] = name;
        } else {
            delete amenities[id];
        }

        // Update the text of the '.amenities H4' element to display the selected amenities
        $('.amenities H4').text(Object.values(amenities).join(', '));
    });
});
