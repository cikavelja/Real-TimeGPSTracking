(function (module) {
 var ForgotPassCtrl = function ($scope, $location, $routeParams, $http) {
     var model = this;

     model.save = function () {
         var email = model.email
        var data = {
            Email: email
        };
         $http.post("http://znamen.rs.azhar.arvixe.com/api/Account/ForgotPassword", data)
                                .then(function (response) {
                                    toastr.success("Please check your e-mail for link to reset your password.", "Success");
                                }).catch(function (reason) {
                                    toastr.error( reason.data.Message,"Error");
                                });;
    };
 };
 GpsTracker.controller("forgotPassCtrl", ForgotPassCtrl);
}());