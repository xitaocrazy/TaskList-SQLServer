var ViewModels;
(function (ViewModels) {
    var IndexViewModel = /** @class */ (function () {
        function IndexViewModel() {
            var _this = this;
            this.insertNewTask = function (task) {
                task.id(_this.taskList().length);
                _this.taskList.push(task);
            };
            this.updateTask = function (task) {
                var oldTask = ko.utils.arrayFirst(_this.taskList(), function (item) {
                    return item.id() === task.id();
                });
                oldTask.title(task.title());
                oldTask.description(task.description());
                oldTask.creation(task.creation());
                oldTask.lastUpdate(task.lastUpdate());
                oldTask.exclusion(task.exclusion());
                oldTask.conclusion(task.conclusion());
                oldTask.status(task.status());
            };
            this.setDefaultValues();
            this.setComputeds();
            this.setSignatures();
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