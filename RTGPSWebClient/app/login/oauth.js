(function (module) {

    var oauth = function ($http, formEncode, currentUser) {

        var login = function (username, password) {

            var config = {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"

                }
            }

            var data = formEncode({
                username: username,
                password: password,
                grant_type: "password"
            });
            //https://wp.afimilk.com/CRE.DataManagerWebAPI/login
            //$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
            return $http.post("http://znamen.rs.azhar.arvixe.com/Token", data, config)
                        .then(function (response) {
                            currentUser.setProfile(username, response.data.access_token);
                            //setTokenCookie(response.data.access_token);
                            //debugger;
                            return username;
                        });

        };

        return {
            login: login
        };
    };
    function setTokenCookie(token) {
        if (token)
            document.cookie = ".AspNetCookies=" + token + "; domain=znamenkapital.rs.azhar.arvixe.com;path=/";
    }
    GpsTracker.factory("oauth", oauth);

}());