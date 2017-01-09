(function (module) {

    var addToken = function (currentUser, $q) {

        var request = function (config) {
            if (currentUser.profile.loggedIn) {
                config.headers.Authorization = "Bearer " + currentUser.profile.token;
            }
            return $q.when(config);
        };

        return {
            request: request
        }
    };

    GpsTracker.factory("addToken", addToken);
    GpsTracker.config(function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.interceptors.push("addToken");
    });

}());