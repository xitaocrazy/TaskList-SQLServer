var ViewModels;
(function (ViewModels) {
    var IndexViewModel = /** @class */ (function () {
        function IndexViewModel() {
            var _this = this;
            this.urlGetAllTasks = "http://localhost:8880/api/TaskList/GetAllTasks";
            this.urlCreateTask = "http://localhost:8880/api/TaskList/CreateTask";
            this.urlUpdateTask = "http://localhost:8880/api/TaskList/UpdateTask";
            this.insertNewTask = function (task) {
                var object = _this.createObjectToPost(task, _this.urlCreateTask, "POST");
                _this.postTask(object);
            };
            this.updateTask = function (task) {
                var object = _this.createObjectToPost(task, _this.urlUpdateTask, "PUT");
                _this.postTask(object);
            };
            this.setTaskList = function (result) {
                var taskList = ko.utils.arrayMap(result, function (task) {
                    return new Models.Task(ko.observable(task["Title"]), ko.observable(task["Description"]), ko.observable(task["Id"]), ko.observable(task["Status"]), ko.observable(task["Creation"]), ko.observable(task["LasUpdate"]), ko.observable(task["Exclusion"]), ko.observable(task["Conclusion"]));
                });
                _this.taskList(taskList);
            };
            this.showError = function (request, message, error) {
                console.log("Ops. Algo errado n�o est� certo. Tente novamente");
                console.log(message + ". Erro: " + error);
            };
            this.setDefaultValues();
            this.setComputeds();
            this.setSignatures();
            this.getAllTasks();
        }
        IndexViewModel.prototype.setDefaultValues = function () {
            this.taskList = ko.observableArray([]);
            this.onGoingList = ko.observableArray([]);
            this.doneList = ko.observableArray([]);
        };
        IndexViewModel.prototype.setComputeds = function () {
            ko.computed(this.setOnGoingList, this, { disposeWhenNodeIsRemoved: true });
            ko.computed(this.setDoneList, this, { disposeWhenNodeIsRemoved: true });
        };
        IndexViewModel.prototype.setOnGoingList = function () {
            var taskList = ko.utils.arrayFilter(this.taskList(), function (task) {
                return task.status();
            });
            this.onGoingList(taskList);
        };
        IndexViewModel.prototype.setDoneList = function () {
            var taskList = ko.utils.arrayFilter(this.taskList(), function (task) {
                return !task.status();
            });
            this.doneList(taskList);
        };
        IndexViewModel.prototype.createObjectToPost = function (task, url, type) {
            var params = {
                "Id": task.id(),
                "Title": task.title(),
                "Status": true,
                "Description": task.description(),
                "Creation": task.creation(),
                "LasUpdate": task.lastUpdate(),
                "Exclusion": task.exclusion(),
                "Conclusion": task.conclusion()
            };
            var object = {
                url: url,
                data: JSON.stringify(params),
                contentType: "application/json",
                type: type
            };
            return object;
        };
        IndexViewModel.prototype.postTask = function (object) {
            var _this = this;
            $.post(object)
                .done(function () {
                _this.getAllTasks();
            })
                .fail(function (request, message, error) {
                _this.showError(request, message, error);
            });
        };
        ;
        IndexViewModel.prototype.getAllTasks = function () {
            var _this = this;
            this.taskList([]);
            $.getJSON(this.urlGetAllTasks)
                .done(function (result) {
                _this.setTaskList(result);
            })
                .fail(function (request, message, error) {
                _this.showError(request, message, error);
            });
        };
        IndexViewModel.prototype.setSignatures = function () {
            this.signatures = [];
            this.signatures.push(ko.postbox.subscribe("task.list.insertNewTask", this.insertNewTask, this));
            this.signatures.push(ko.postbox.subscribe("task.list.updateTask", this.updateTask, this));
        };
        IndexViewModel.prototype.dispose = function () {
            for (var i = 0; i < this.signatures.length; i++) {
                this.signatures[i].dispose();
            }
        };
        return IndexViewModel;
    }());
    ViewModels.IndexViewModel = IndexViewModel;
})(ViewModels || (ViewModels = {}));
//# sourceMappingURL=IndexViewModel.js.map