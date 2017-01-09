(function (module) {

    GpsTracker.factory('CheckGGroupDuplicates', function ($resource) {
        return $resource('http://znamen.rs.azhar.arvixe.com/api/CheckGGroupDuplicates?id=:id', { id: '@id' }, { update: { method: 'PUT' } });
    });

    GpsTracker.factory('MyGGroupsAdd', function ($resource) {
        return $resource('http://znamen.rs.azhar.arvixe.com/api/MyGGroupsAdd?id=:id', { id: '@id' });
    });


    GpsTracker.factory('GetMyGGroup', function ($resource) {
        return $resource('http://znamen.rs.azhar.arvixe.com/api/MyGGroup/');
    });

    //TodoApp.factory('SMSMessages', function ($resource) {
    //    return $resource('/api/SMSMessages/:id', { id: '@id' }, { update: { method: 'PUT' } });
    //});

    var AddGGroupsCtrl = function ($scope, $location, $routeParams, CheckGGroupDuplicates, MyGGroupsAdd, GetMyGGroup) {
        var model = this;

        model.myGgroup = [];
        model.newGGroupItem = [];

        model.fillggroup = function () {
            GetMyGGroup.query().$promise.then(
                              //success
                              function (data) {
                                  model.rec = data;
                                  //toastr.success("User selected", "Success");

                              },
                              //error
                              function (error) {
                                  debugger;
                                  toastr.error("Internal Error", "Error");
                              }
                       );
        };
        model.fillggroup();

        model.addusertogroup = function () {
            var id = model.adduser;
            CheckGGroupDuplicates.query({ id: id })
                      .$promise.then(
                    //success
                    function (data) {
                        debugger;
                        if (data == "1") {
                            toastr.success("User added to group.", "Success");
                            model.newGGroupItem.push({
                                UserId: model.inData
                            });
                            var newGgroupItem = new MyGGroupsAdd();
                            newGgroupItem.GroupMember = id;
                            newGgroupItem.$save(function () {
                                //fill gitems
                                //toastr.success("Insert!!!", "Success");
                                model.fillggroup();
                            })

                        }
                        if (data == "2") {
                            toastr.warning("User is already selected.", "Warning");
                        }
                        if (data == "3") {
                            toastr.error("User does not exist", "Error");
                        }
                    },
                    //error
                    function (error) {
                        debugger;
                        toastr.error(error);
                    }
             );

        };


        model.delid = function (id) {
            debugger;
            model.del = id;
        };
        model.delete = function () {
            debugger;
            var id = model.del;
            MyGGroupsAdd.delete({ id: id }, function () {
                //$('#sms_' + id).fadeOut();
                model.fillggroup();
            });
        };

    };

    GpsTracker.controller("addGGroupsCtrl", AddGGroupsCtrl);


}());