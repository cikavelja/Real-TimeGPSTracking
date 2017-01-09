var GpsTracker = angular.module('GpsTracker', ['ngRoute', 'ngResource', 'ngCookies', 'ngAnimate'])
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push("addToken");
        //$httpProvider.interceptors.push("loginRedirect");
        //$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };

    })
    .config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {

        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

        $routeProvider
        .when('/', { templateUrl: './app/blog/template/blog/list.html' })
        //.when('/new', { controller: CreateCtrl, templateUrl: 'details.html' })
        //.when('/edit/:editPostId', { controller: EditCtrl, templateUrl: 'details.html' })
        .when('/login', { templateUrl: './app/authentication/template/login.html' })
        .when('/map', { templateUrl: './app/GMaps/gmap.html' })
        .when('/addblog', { templateUrl: './app/blog/template/blog/detail.html' })
        .when('/editblog/:editBlogId', { templateUrl: './app/blog/template/blog/details.html' })
        //.when('/blogresponse', { controller: ListBlogResponseCtrl, templateUrl: '/app/blog/template/blogresponse/list.html' })
        .when('/addblogresponse/:bid', { templateUrl: './app/blog/template/blogresponse/detail.html' })
        //.when('/editblogresponse/:editresponseId', { controller: EditBlogResponseCtrl, templateUrl: '/blog/template/blogresponse/details.html' })
        //.when('/gcalcredentials/', { controller: EditGCalCredentialsCtrl, templateUrl: '/sms/gcalcredentials/detail.html' })
        //.when('/newsms', { controller: AddReceiversCtrl, templateUrl: '/sms/newsms/newsms.html' })
        //.when('/receivedsms', { controller: ListMyReceivedCtrl, templateUrl: '/sms/receivedsms/receivedsms.html' })
        //.when('/sentsms', { controller: ListMySentCtrl, templateUrl: '/sms/sentsms/sentsms.html' })
        .when('/createuser', { templateUrl: './app/authentication/template/createuser.html' })
        .when('/changepassword', { templateUrl: './app/authentication/template/changepass.html' })
        .when('/forgotpassword', { templateUrl: './app/authentication/template/forgotpassword.html' })
        .when('/resetpassword', { templateUrl: './app/authentication/template/resetpassword.html' })
        //.when('/rt', { controller: testCtrl, templateUrl: '/st/rt.html' })
        //.when('/sr', { controller: SignalCtrl, templateUrl: '/st/sr.html' })
        //.when('/cu', { controller: GetCheckUser, templateUrl: '/st/checkuser.html' })
        .when('/addtracker', { templateUrl: './app/GMaps/groups.html' })
        .when('/history', { templateUrl: './app/GMaps/history.html' })
        .when('/trackdetails', { templateUrl: './app/GMaps/trackdetails.html' })
        .otherwise({ redirectTo: '/' });
        //$locationProvider.html5Mode({
        //    enabled: true
        //});
    }])
    .provider('myCSRF', [function () {
        var headerName = 'X-CSRFToken';
        var cookieName = 'csrftoken';
        var allowedMethods = ['GET'];

        this.setHeaderName = function (n) {
            headerName = n;
        }
        this.setCookieName = function (n) {
            cookieName = n;
        }
        this.setAllowedMethods = function (n) {
            allowedMethods = n;
        }
        this.$get = ['$cookies', function ($cookies) {
            return {
                'request': function (config) {
                    if (allowedMethods.indexOf(config.method) === -1) {
                        // do something on success
                        config.headers[headerName] = $cookies[cookieName];
                    }
                    return config;
                }
            }
        }];
    }])
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('myCSRF');
    })
.run(['$http', '$cookies', function ($http, $cookies) {
    $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
}]);




//var logOutCtrl = function ($scope, localStorage) {
//    $scope.logout = function () {
//        localStorage.remove("utoken");
//    };
//};
