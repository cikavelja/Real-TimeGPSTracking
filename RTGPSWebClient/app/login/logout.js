(function (module) {

    var loginOut = function ($scope, localStorage, $location, $route, $timeout ) {
        $scope.logout = function () {
            localStorage.remove("utoken");
            window.location.replace("http://znamen.rs.azhar.arvixe.com/index.html");
           
        };
    };

    GpsTracker.controller("loginOut", loginOut);

}());