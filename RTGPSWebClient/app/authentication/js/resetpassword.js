(function (module) {
 var ResetPassCtrl = function ($scope, $location, $routeParams, $http) {
     var model = this;

     $scope.save = function () {
        var mail = ($location.search()).m;
        var code = ($location.search()).c;
        var newpass = $scope.newpass
        var data = {
            Email: mail,
            Password: newpass,
            ConfirmPassword: newpass,
            Code:code
        };
         $http.post("http://znamen.rs.azhar.arvixe.com/api/Account/ResetPassword", data)
            .then(function (response) {
                toastr.success("Password changed", "Success");
            })
            .catch(function (reason) {
                                            debugger;
            if (reason.data.ModelState === undefined) {
                toastr.error(reason.data.Message, "Error");
                //$scope.errors = reason.data.Message;

            }
            else {
                toastr.error(parseErrors(reason), "Error");
                //$scope.errors = parseErrors(reason);

            }
                                    
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
    }
    };
 };
 GpsTracker.controller("resetPassCtrl", ResetPassCtrl);

}());