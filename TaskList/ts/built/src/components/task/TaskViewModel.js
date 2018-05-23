var KnockoutComponents;
(function (KnockoutComponents) {
    var TaskViewModel = /** @class */ (function () {
        function TaskViewModel(params) {
            var _this = this;
            this.params = params;
            this.selectToEdit = function (task) {
                _this.isEditing(true);
                _this.taskToEdit = task;
                _this.task().id(task.id());
                _this.task().title(task.title());
                _this.task().description(task.description());
                _this.task().creation(task.creation());
                _this.task().lastUpdate(task.lastUpdate());
                _this.task().exclusion(task.exclusion());
                _this.task().conclusion(task.conclusion());
                _this.task().status(task.status());
            };
            this.setDefaultValues();
            this.setSignatures();
        }
        TaskViewModel.prototype.setDefaultValues = function () {
            this.task = ko.observable(new Models.Task(ko.observable(""), ko.observable("")));
            this.isEditing = ko.observable(false);
            this.operation = ko.observable("");
            this.hasNoTitle = ko.observable(false);
            this.hasNoDescription = ko.observable(false);
        };
        TaskViewModel.prototype.setComputeds = function () {
            ko.computed(this.setOperation, this, { disposeWhenNodeIsRemoved: true });
        };
        TaskViewModel.prototype.setOperation = function () {
            this.operation(this.isEditing() ? "Add new" : "Update");
        };
        TaskViewModel.prototype.hasValidData = function () {
            this.hasNoTitle(this.task().title() === "");
            this.hasNoDescription(this.task().description() === "");
            return !this.hasNoTitle() && !this.hasNoDescription();
        };
        TaskViewModel.prototype.cleanData = function () {
            this.task(new Models.Task(ko.observable(""), ko.observable("")));
            this.hasNoTitle(false);
            this.hasNoDescription(false);
            this.isEditing(false);
        };
        TaskViewModel.prototype.insertNewTask = function () {
            var task = new Models.Task(ko.observable(this.task().title()), ko.observable(this.task().description()));
            ko.postbox.publish("task.list.insertNewTask", task);
            this.cleanData();
        };
        TaskViewModel.prototype.setSignatures = function () {
            this.signatures = [];
            this.signatures.push(ko.postbox.subscribe("task.list.selectToEdit", this.selectToEdit, this));
            this.signatures.push(ko.postbox.subscribe("task.list.changeStatus", this.clearData, this));
        };
        TaskViewModel.prototype.clearData = function () {
            this.cleanData();
        };
        ;
        TaskViewModel.prototype.addNewItem = function () {
            if (this.hasValidData()) {
                this.insertNewTask();
            }
        };
        ;
        TaskViewModel.prototype.updateItem = function () {
            if (this.hasValidData()) {
                this.taskToEdit = this.task();
            }
            ko.postbox.publish("task.list.updateTask", this.taskToEdit);
            this.cleanData();
        };
        ;
        return TaskViewModel;
    }());
    KnockoutComponents.TaskViewModel = TaskViewModel;
})(KnockoutComponents || (KnockoutComponents = {}));
ko.components.register("task-component", {
    viewModel: KnockoutComponents.TaskViewModel,
    template: { require: "text!../ts/src/components/task/TaskViewModel.html" }
});
//# sourceMappingURL=TaskViewModel.js.map