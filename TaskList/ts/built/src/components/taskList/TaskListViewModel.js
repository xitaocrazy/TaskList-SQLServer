var KnockoutComponents;
(function (KnockoutComponents) {
    var TaskListViewModel = /** @class */ (function () {
        function TaskListViewModel(params) {
            var _this = this;
            this.params = params;
            this.urlUpdateTask = "http://localhost:8880/api/TaskList/UpdateTaskStatus";
            this.showError = function (request, message, error) {
                alert("Ops. Algo errado não está certo. Tente novamente");
                console.log(message + ". Erro: " + error);
            };
            this.changeStatus = function (task) {
                if (task.exclusion() === null || task.exclusion() === "") {
                    var object = _this.createObjectToPost(task, "PUT");
                    _this.postTask(object);
                }
            };
            this.setDefaultValues();
        }
        TaskListViewModel.prototype.setDefaultValues = function () {
            this.title = ko.observable(this.params.title);
            this.taskList = this.params.taskList;
        };
        TaskListViewModel.prototype.createObjectToPost = function (task, type) {
            var url = this.urlUpdateTask + "?id=" + task.id() + "&status=" + !task.status();
            var object = {
                url: url,
                contentType: "application/json",
                type: type
            };
            return object;
        };
        TaskListViewModel.prototype.postTask = function (object) {
            var _this = this;
            $.post(object)
                .done(function () {
                ko.postbox.publish("task.list.reloadTasks");
            })
                .fail(function (request, message, error) {
                _this.showError(request, message, error);
            });
        };
        ;
        TaskListViewModel.prototype.selectToEdit = function (task) {
            ko.postbox.publish("task.list.selectToEdit", task);
        };
        ;
        return TaskListViewModel;
    }());
    KnockoutComponents.TaskListViewModel = TaskListViewModel;
})(KnockoutComponents || (KnockoutComponents = {}));
ko.components.register("task-list-component", {
    viewModel: KnockoutComponents.TaskListViewModel,
    template: { require: "text!../ts/src/components/taskList/TaskListViewModel.html" }
});
//# sourceMappingURL=TaskListViewModel.js.map