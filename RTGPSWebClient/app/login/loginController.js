(function(module) {

    var loginController = function (oauth, currentUser, loginRedirect) {
        var model = this;

        model.username = "";
        model.password = "";
        model.user = currentUser.profile;

        model.login = function(form) {
            if (form.$valid) {
                oauth.login(model.username, model.password)
                     .then(function () {
                         loginRedirect.redirectPostLogin();
                     })
                       .catch(function (reason) {
                           toastr.error(reason.data.error_description, "Error");
                       });
                model.password = model.username = "";
                form.$setUntouched();                
            }
        }
    };

    GpsTracker.controller("loginController", loginController);

}());     