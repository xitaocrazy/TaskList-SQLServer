var KnockoutComponents;
(function (KnockoutComponents) {
    var TaskListViewModel = /** @class */ (function () {
        function TaskListViewModel(params) {
            this.params = params;
            this.selectToEdit = function (task) {
                ko.postbox.publish("task.list.selectToEdit", task);
            };
            this.changeStatus = function (task) {
                task.status(!task.status());
                ko.postbox.publish("task.list.changeStatus", task);
            };
            this.setDefaultValues();
        }
        TaskListViewModel.prototype.setDefaultValues = function () {
            this.title = ko.observable(this.params.title);
            this.taskList = this.params.taskList;
        };
        return TaskListViewModel;
    }());
    KnockoutComponents.TaskListViewModel = TaskListViewModel;
})(KnockoutComponents || (KnockoutComponents = {}));
ko.components.register("task-list-component", {
    viewModel: KnockoutComponents.TaskListViewModel,
    template: { require: "text!../ts/src/components/taskList/TaskListViewModel.html" }
});
//# sourceMappingURL=TaskListViewModel.js.map