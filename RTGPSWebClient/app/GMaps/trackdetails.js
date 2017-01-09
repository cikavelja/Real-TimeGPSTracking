(function (module) {

    GpsTracker.directive('myMaps', ['factoryProvider', function (factoryProvider) {
        return {
            restrict: 'A',
            replace: true,
            template: '<div id="gmaps"></div>',
            controller: function ($scope) {
            },
            link: link

        };
    }]);

    GpsTracker.factory('GetRoutesDetails', function ($resource) {
        return $resource('http://znamen.rs.azhar.arvixe.com/api/GetRoutesPerConn/:id');
    });

    GpsTracker.factory('factoryProvider', function () {
        return {
            name: 'my Name'
        }
    });



    var link = function ($scope, element, $http, attrs, $location, $route, factoryProvider) {
        var map, infoWindow;
        var markers = [];

        // map config
        var mapOptions = {
            center: new google.maps.LatLng(43.803000, 17.163390),
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: true
        };

        // init the map
        function initMap() {
            if (map === void 0) {
                map = new google.maps.Map(element[0], mapOptions);
            }
        }

        // place a marker
        function setMarker(map, position, title, content) {
            var marker;
            var markerOptions = {
                position: position,
                map: map,
                title: title,
                icon: 'https://lh3.ggpht.com/hx6IeSRualApBd7KZB9s2N7bcHZIjtgr9VEuOxHzpd05_CZ6RxZwehpXCRN-1ps3HuL0g8Wi=w9-h9'
            };

            marker = new google.maps.Marker(markerOptions);
            markers.push(marker); // add marker to array

            google.maps.event.addListener(marker, 'click', function () {
                // close window if not undefined
                if (infoWindow !== void 0) {
                    infoWindow.close();
                }
                // create new window
                var infoWindowOptions = {
                    content: content
                };
                infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                infoWindow.open(map, marker);
            });
        }

        // show the map and place some markers
        initMap();


        var flightPlanCoordinates = [];

        $('#test1').show();
        $.get("http://znamen.rs.azhar.arvixe.com/api/GetRoutesPerConn?conn=" + window.location.hash.replace("#/trackdetails?conn=", ""), function (data) {

            $('#test1').hide();
            data.forEach(function (entry) {

                flightPlanCoordinates.push(new google.maps.LatLng(entry.lat, entry.lon));
                setMarker(map, new google.maps.LatLng(entry.lat, entry.lon), 'Speed', entry.speed);
            });

            var flightPath = new google.maps.Polyline({
                path: flightPlanCoordinates,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });

            flightPath.setMap(map);

        });
    };

    function htmlEncode(value) {
        var encodedValue = $('<div />').text(value).html();
        return encodedValue;
    };
}());
