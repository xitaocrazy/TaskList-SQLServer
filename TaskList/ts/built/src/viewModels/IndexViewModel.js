var ViewModels;
(function (ViewModels) {
    var IndexViewModel = /** @class */ (function () {
        function IndexViewModel() {
            this.urlGetAllTasks = "http://localhost:8880/api/TaskList/GetAllTasks";
            this.setDefaultValues();
            this.setComputeds();
            this.setSignatures();
            this.getAllTasks();
        }
        IndexViewModel.prototype.setDefaultValues = function () {
            this.taskList = ko.observableArray([]);
            this.onGoingList = ko.observableArray([]);
            this.doneList = ko.observableArray([]);
            this.cancelledList = ko.observableArray([]);
        };
        IndexViewModel.prototype.setComputeds = function () {
            ko.computed(this.setOnGoingList, this, { disposeWhenNodeIsRemoved: true });
            ko.computed(this.setDoneList, this, { disposeWhenNodeIsRemoved: true });
            ko.computed(this.setCancelledList, this, { disposeWhenNodeIsRemoved: true });
        };
        IndexViewModel.prototype.setOnGoingList = function () {
            var taskList = ko.utils.arrayFilter(this.taskList(), function (task) {
                return task.status() && (task.exclusion() === null || task.exclusion() === "") && (task.conclusion() === null || task.conclusion() === "");
            });
            this.onGoingList(taskList);
        };
        IndexViewModel.prototype.setDoneList = function () {
            var taskList = ko.utils.arrayFilter(this.taskList(), function (task) {
                return !task.status() && (task.exclusion() === null || task.exclusion() === "");
            });
            this.doneList(taskList);
        };
        IndexViewModel.prototype.setCancelledList = function () {
            var taskList = ko.utils.arrayFilter(this.taskList(), function (task) {
                return task.exclusion() !== null && task.exclusion() !== "";
            });
            this.cancelledList(taskList);
        };
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
        IndexViewModel.prototype.setTaskList = function (result) {
            var taskList = ko.utils.arrayMap(result, function (task) {
                return new Models.Task(ko.observable(task["Title"]), ko.observable(task["Description"]), ko.observable(task["Id"]), ko.observable(task["Status"]), ko.observable(task["Creation"]), ko.observable(task["LasUpdate"]), ko.observable(task["Exclusion"]), ko.observable(task["Conclusion"]));
            });
            this.taskList(taskList);
        };
        ;
        IndexViewModel.prototype.showError = function (request, message, error) {
            alert("Ops. Algo errado n�o est� certo. Tente novamente");
            console.log(message + ". Erro: " + error);
        };
        ;
        IndexViewModel.prototype.setSignatures = function () {
            this.signatures = [];
            this.signatures.push(ko.postbox.subscribe("task.list.reloadTasks", this.getAllTasks, this));
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