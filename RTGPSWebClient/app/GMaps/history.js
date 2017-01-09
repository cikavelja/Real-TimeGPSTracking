(function (module) {
    GpsTracker.factory('History', function ($resource) {
        return $resource('http://znamen.rs.azhar.arvixe.com/api/History/GetHistory/:id', { id: '@id' }, { update: { method: 'PUT' } });
    });

    GpsTracker.factory('GetMyGGroup', function ($resource) {
        return $resource('http://znamen.rs.azhar.arvixe.com/api/MyGGroup/');
    });

    var HistoryCtrl = function ($scope, $location, GetMyGGroup, History) {
        var model = this;

        model.search = function () {
            History.query({
                q: model.groupMembers,
                sort: model.sort_order,
                desc: model.is_desc,
                offset: model.offset,
                limit: model.limit,
                days: model.daysSelected,
                uid: model.groupMembers
            }, function (data) {
                debugger;
                if (data == "Select user please") {
                    toastr.error("Select user please", "Error");
                }
                model.more = data.length === 20;
                model.items = model.items.concat(data);
            });

        };

        var iname = [];
        var fillonce = 1;
        model.fillggroup = function () {
            GetMyGGroup.query().$promise.then(
                              //success
                              function (data) {
                                  debugger;
                                  model.rec = data;
                                  var t = 1;
                                  data.forEach(function (entry) {
                                      iname.push({
                                          Id: t, Name: entry
                                      });
                                      ++t;
                                  });
                                  if (fillonce == 1) {
                                      //alert(fillonce);
                                      model.Records = iname;
                                      ++fillonce;
                                      //alert(fillonce);
                                  }
                              },
                              //error
                              function (error) {
                                  debugger;
                                  toastr.error("Internal Error", "Error");
                              }
                       );
        };
        model.fillggroup();
        model.GetRecords = function (record) {
            var recordId = model.ddlRecords;
            var recordName = $.grep(model.Records, function (record) {
                return record.Id == recordId;
            })[0].Name;
            //alert("Selected Value: " + recordId + "\nSelected Text: " + recordName);
            model.groupMembers = recordName;
        }

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
                History.delete({ id: id }, function () {
                    $('#track_' + id).fadeOut();
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
        model.sort_order = 'UserId';
        model.is_desc = false;
        model.action = "Save";

        model.reset();

    };
    GpsTracker.controller("historyCtrl", HistoryCtrl);

}());