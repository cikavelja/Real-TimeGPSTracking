(function (module) {
 var ChangePassCtrl = function ($scope, $location, $routeParams, $http) {
     var model = this;
     model.saveuser = function () {
         var oldpass = model.OldPass
         var newpass = model.NewPass
        var data = {
            OldPassword: oldpass,
            NewPassword: newpass,
            ConfirmPassword: newpass
        };
         $http.post("http://znamen.rs.azhar.arvixe.com/api/Account/ChangePassword", data)
                                .then(function (response) {
                                    toastr.success("Password changed", "Success");
                                }).catch(function (reason) {
                                    debugger;
                                    if (reason.data.ModelState === undefined) {
                                        toastr.error(reason.data.Message, "Error");
                                        //$scope.errors = reason.data.Message;

                                    }
                                    else {
                                        toastr.error(parseErrors(reason), "Error");
                                        //$scope.errors = parseErrors(reason);

                                    };
                                    
                                });


        function parseErrors(response) {
            var errors = [];
            for (var key in response.data.ModelState) {
                for (var i = 0; i < response.data.ModelState[key].length; i++) {
                    if (response.data.ModelState[key][i] != 2) {
                        errors.push(response.data.ModelState[key][i]);
                    }
                }
            }
            return errors;
        };
    };
 };
 GpsTracker.controller("changePassCtrl", ChangePassCtrl);
}());