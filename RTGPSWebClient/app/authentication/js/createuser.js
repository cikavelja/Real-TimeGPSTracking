(function (module) {

var CreateUserCtrl = function ($scope, $location, $routeParams, $http) {
    var model = this;

    model.saveuser = function () {
        var email = model.Email
        var pass = model.Pass
        var data = {
            Email: email,
            Password: pass,
            ConfirmPassword: pass
        };
        $http.post("http://znamen.rs.azhar.arvixe.com/api/Account/Register", data)
                                .then(function (response) {
                                    toastr.success("User Created", "Success");
                                }).catch(function (reason) {
                                    toastr.error(reason.data.ModelState[""][0], "Error");
                                });;
    };
};
GpsTracker.controller("createUserCtrl", CreateUserCtrl);
}());
