(function (module) {
    GpsTracker.directive('myMap', function () {


        // directive link function

        return {
            restrict: 'A',
            template: '<div id="gmaps"></div>',
            replace: true,
            link: link
        };
    });

    var link = function ($scope, element, attrs, localStorage, $location, $route, oauth, currentUser) {
        var map, infoWindow;
        var markers = [];
        debugger;
        //178.220.42.241
        $scope.logout = function () {
            localStorage.remove("utoken");
        };

        try {
            //$.connection.hub.url = "http://znamen.rs.azhar.arvixe.com/signalr";
            $.connection.hub.url = "http://znamen.rs.azhar.arvixe.com/signalr/"
            //$.hubConnection("http://znamen.rs.azhar.arvixe.com/signalr/", { useDefaultPath: false });
            debugger;
            $.connection.hub.logging = true;
            //$.connection.hub.start({ withCredentials: true });
           //var token = localStorage.get("utoken");
           // $.signalR.ajaxDefaults.headers = { Authorization: "Bearer " + token };
        $.connection.hub.error(function (err) {

            console.log(err);
            alert(err.context.status);
            toastr.error("Please log in", "Error");
            window.location.replace("./index.html#/login");
        });

        var track = $.connection.trackerHub;


        } catch (e) {
            alert("Error in start");
        }

        // map config 43.803000, 17.163390
        var mapOptions = {
            center: new google.maps.LatLng(43.803000, 17.163390),
            zoom: 1,
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

        // Create a function that the hub can call back to display messages.
        try {
        track.client.newConnection = function (a, s, d) {
            // Add the message to the page.
            debugger;
            $('#discussion').append('<li><strong>' + htmlEncode(s)
                + '</strong>: ' + htmlEncode(a) + htmlEncode(d) + '</li>');
            debugger;
        };
        track.client.tdata = function (a, s) {
            // Add the message to the page.
            var element = document.getElementById('geolocation');
            //element.innerHTML = "";
            element.innerHTML = 'Lat: ' + a + ':' +
                                'Lon: ' + s + '<br />' +
                                '<hr />' + element.innerHTML;
            debugger;

        };
        var flightPlanCoordinates = [];

        //$.connection.hub.start()
        //   .done(function (param) {
        //       chat.server.send("Connected");
        //   })
        //   .fail(function (param) {
        //       alert("Could not Connect: " + param);
        //   });

        track.client.addnewroute = function (lon, lat, speed, id) {
            if (speed == null) {
                //do something
            }
            else {
                setMarker(map, new google.maps.LatLng(lat, lon), 'Speed', speed);
                flightPlanCoordinates.push(new google.maps.LatLng(lat, lon));
                      //var flightPath = new google.maps.Polyline({
                      //    path: flightPlanCoordinates,
                      //    geodesic: true,
                      //    strokeColor: '#FF0000',
                      //    strokeOpacity: 1.0,
                      //    strokeWeight: 2
                      //});

                      //flightPath.setMap(map);

                      debugger;

            }
        };


        $.connection.hub.start().done(function () {
            $('#sendmessage').click(function () {

                // Call the Send method on the hub.
                //track.server.sendRoute($('#lon').val(), $('#lat').val(), 2);
                //track.server.sendRoute("Test", "");
                // Clear text box and reset focus for next comment.
                //$('#lat').val('').focus();
            });
            // alert($('#lon').val() +" / "+ $('#lat').val());
        });
        } catch (e) {
            alert(e.message)
        }
        //setMarker(map, new google.maps.LatLng(51.508515, -0.125487), 'London', 'Just some content');
        //setMarker(map, new google.maps.LatLng(52.370216, 4.895168), 'Amsterdam', 'More content');
        //setMarker(map, new google.maps.LatLng(48.856614, 2.352222), 'Paris', 'Text here');
    };
    function htmlEncode(value) {
        var encodedValue = $('<div />').text(value).html();
        return encodedValue;
    };

}());