GpsTracker.config(function ($provide) {
        $provide.decorator("$exceptionHandler",
            ["$delegate",
            function ($delegate) {
                return function (exception, cause) {
                    debugger;
                $delegate(exception, cause);
                //toastr.error(exception.message, "Error");
            };
        }]);
    });

