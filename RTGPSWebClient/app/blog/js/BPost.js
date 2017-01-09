(function (module) {

    GpsTracker.factory('BResponse', function ($resource) {
        return $resource('http://znamen.rs.azhar.arvixe.com/api/BResponses/:id', { id: '@id' }, { update: { method: 'PUT' } });
    });
    GpsTracker.factory('BlogResponse', function ($resource) {
        return $resource('http://znamen.rs.azhar.arvixe.com/api/BlogResponses/:id');
    });

    //var EditBlogResponseCtrl = function ($scope, $location, $routeParams, BResponse, BlogResponse) {
    //    $scope.action = "Update";
    //    var id = $routeParams.editBlogId;
    //    $scope.item = BlogResponse.get({ id: id });
    //    $scope.save = function () {
    //        BResponse.update({ id: id }, $scope.item, function () {
    //            $location.path('/');
    //        });
    //    };
    //};

    var CreateBlogResponseCtrl = function ($scope, $location, $routeParams, BResponse, BlogResponse) {
        var model = this;
        debugger;
        var id = $routeParams.bid;
        model.bitem = BlogResponse.query({ id: id }, function (data) {
            model.ditem = data[0];
        });
        model.action = "Add";

        model.save = function () {
            alert("Save");
            BResponse.save(model.ditem, function () {
                $location.path('/blog');
            });
        };
    };
    //CreateBlogResponseCtrl();
    //var ListBlogResponseCtrl = function ($scope, $location, BResponse) {
    //    $scope.search = function () {
    //        BResponse.query({
    //            q: $scope.query,
    //            sort: $scope.sort_order,
    //            desc: $scope.is_desc,
    //            offset: $scope.offset,
    //            limit: $scope.limit
    //        }, function (data) {
    //            $scope.more = data.length === 20;
    //            $scope.items = $scope.items.concat(data);
    //        });

    //    };

    //    $scope.sort = function (col) {
    //        if ($scope.sort_order === col) {
    //            $scope.is_desc = !$scope.is_desc;
    //        }
    //        else {
    //            $scope.sort_order = col;
    //            $scope.is_desc = false;

    //        };
    //        $scope.reset();

    //    };

    //    $scope.delete = function (id) {
    //        //var id = this.blog(id);
    //        if (confirm('Are you sure to delete?')) {
    //            BResponse.delete({ id: id }, function () {
    //                $('#blog_' + id).fadeOut();
    //            });
    //        }


    //    };

    //    $scope.show_more = function () {
    //        $scope.offset += $scope.limit;
    //        $scope.search();
    //    };
    //    $scope.has_more = function () {
    //        return $scope.more;
    //    };
    //    $scope.reset = function () {
    //        $scope.limit = 20;
    //        $scope.offset = 0;
    //        $scope.items = [];
    //        $scope.more = true;

    //        $scope.search();
    //    };
    //    $scope.sort_order = 'Created';
    //    $scope.is_desc = false;
    //    $scope.action = "Save";

    //    $scope.reset();

    //};
    GpsTracker.controller("createBlogResponseCtrl", CreateBlogResponseCtrl);

}());