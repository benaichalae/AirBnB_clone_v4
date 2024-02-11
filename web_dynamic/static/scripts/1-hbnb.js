$(document).ready(function() {
    // Initialize an object to store selected amenities' ids and names
    const amenitiesId = {};

    // Function to handle checkbox click event
    $('INPUT[type="checkbox"]').change(function() {
        const id = $(this).attr('data-id');
        const name = $(this).attr('data-name');

        if ($(this).is(':checked')) {
            // Add the selected amenity to the amenitiesId object
            amenitiesId[id] = name;
        } else {
            // Remove the deselected amenity from the amenitiesId object
            delete amenitiesId[id];
        }

        // Update the text of the '.amenities h4' element to display the selected amenities
        $('.amenities h4').text(Object.values(amenitiesId).join(', '));
    });
});
