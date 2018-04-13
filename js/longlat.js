function getLocation()
{
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else
    {
        alert("Geolocation is not supported by this browser.");
    }
}
function showPosition(position)
{
    $.ajax({
        type: "POST",
        url: "include/temperature.php",
        data: {lat: position.coords.latitude, long: position.coords.longitude},
        success: function (response)
        {
            var response_object = JSON.parse(response);
            $('#weather_icon').attr('src', response_object.cond_icon);
            $('#act_temp').html(response_object.temp_c + '<sup>°C</sup>');
            setCookie('current_temp', response, 1);
        }
    });
}
if (!checkCookie('current_temp'))
{
    getLocation();
}
else
{
    var json_object = JSON.parse(getCookie('current_temp'));

    $('#weather_icon').attr('src', json_object.cond_icon);
    $('#act_temp').html(json_object.temp_c + '<sup>°C</sup>');
}