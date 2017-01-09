(function (module) {


    GpsTracker.factory('Blog', function ($resource) {
        return $resource('http://znamen.rs.azhar.arvixe.com/api/Blogs/:id', { id: '@id' }, { update: { method: 'PUT' } });
    });


    var EditAddBlogCtrl = function ($scope, $location, $routeParams, Blog) {
        var model = this;
        var id = $routeParams.editPostId;
        if (id == null) {
            model.action = "Add";
            model.save = function () {
                Blog.save(model.item, function () {
                    $location.path('/');
                }, function (error) {
                    toastr.error("Internal Error", "Error");
                });
            };
        }
        else {
            model.action = "Update";
            model.item = Blog.get({ id: id });
            model.save = function () {
                Blog.update({ id: id }, model.item, function () {
                    $location.path('/');
                });
            };

        }

    };



    //var EditBlogCtrl = function ($scope, $location, $routeParams, Blog) {
    //    var model = this;
    //    model.action = "Update";
    //    var id = $routeParams.editPostId;
    //    model.item = Blog.get({ id: id });
    //    model.save = function () {
    //        Blog.update({ id: id }, model.item, function () {
    //            $location.path('/');
    //        });
    //    };
    //};

    //var CreateBlogCtrl = function ($scope, $location, Blog) {
    //    var model = this;
    //    model.action = "Add";
    //    model.save = function () {
    //        Blog.save(model.item, function () {
    //            $location.path('/');
    //        }, function (error) {
    //            toastr.error("Internal Error", "Error");
    //        });
    //    };
    //};

    var ListBlogCtrl = function ($scope, $location, $sce, Blog) {
        var model = this;

        model.search = function () {
            Blog.query({
                q: model.query,
                sort: model.sort_order,
                desc: model.is_desc,
                offset: model.offset,
                limit: model.limit
            }, function (data) {
                model.more = data.length === 20;
                model.items = model.items.concat(data);
            });

        };
        model.renderHtml = function (html_code) {
            return $sce.trustAsHtml(html_code);
        };


        model.sort = function (col) {
            if (model.sort_order === col) {
                model.is_desc = !model.is_desc;
            }
            else {
                model.sort_order = col;
                model.is_desc = false;

            };
            model.reset();

        };

        model.delete = function (id) {
            //var id = this.blog(id);
            if (confirm('Are you sure to delete?')) {
                Blog.delete({ id: id }, function () {
                    $('#blog_' + id).fadeOut();
                });
            }


        };

        model.show_more = function () {
            model.offset += model.limit;
            model.search();
        };
        model.has_more = function () {
            return model.more;
        };
        model.reset = function () {
            model.limit = 20;
            model.offset = 0;
            model.items = [];
            model.more = true;

            model.search();
        };
        model.sort_order = 'Created';
        model.is_desc = false;
        model.action = "Save";

        model.reset();

    };


    //GpsTracker.controller("EditBlogCtrl", EditBlogCtrl);
    GpsTracker.controller("editAddBlogCtrl", EditAddBlogCtrl);
    GpsTracker.controller("listBlogCtrl", ListBlogCtrl);


}());