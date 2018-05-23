var KnockoutComponents;
(function (KnockoutComponents) {
    var TaskViewModel = /** @class */ (function () {
        function TaskViewModel(params) {
            this.params = params;
            this.urlCreateTask = "http://localhost:8880/api/TaskList/CreateTask";
            this.urlUpdateTask = "http://localhost:8880/api/TaskList/UpdateTask";
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
        TaskViewModel.prototype.createObjectToPost = function (task, url, type) {
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
        TaskViewModel.prototype.postTask = function (object) {
            var _this = this;
            $.post(object)
                .done(function () {
                _this.cleanData();
                ko.postbox.publish("task.list.reloadTasks");
            })
                .fail(function (request, message, error) {
                _this.showError(request, message, error);
            });
        };
        ;
        TaskViewModel.prototype.showError = function (request, message, error) {
            alert("Ops. Algo errado n�o est� certo. Tente novamente");
            console.log(message + ". Erro: " + error);
        };
        ;
        TaskViewModel.prototype.selectToEdit = function (task) {
            this.isEditing(true);
            this.taskToEdit = task;
            this.task().id(task.id());
            this.task().title(task.title());
            this.task().description(task.description());
            this.task().creation(task.creation());
            this.task().lastUpdate(task.lastUpdate());
            this.task().exclusion(task.exclusion());
            this.task().conclusion(task.conclusion());
            this.task().status(task.status());
        };
        ;
        TaskViewModel.prototype.setSignatures = function () {
            this.signatures = [];
            this.signatures.push(ko.postbox.subscribe("task.list.selectToEdit", this.selectToEdit, this));
            this.signatures.push(ko.postbox.subscribe("task.list.reloadTasks", this.clearData, this));
        };
        TaskViewModel.prototype.clearData = function () {
            this.cleanData();
        };
        ;
        TaskViewModel.prototype.addNewItem = function () {
            if (this.hasValidData()) {
                var task = new Models.Task(ko.observable(this.task().title()), ko.observable(this.task().description()));
                var object = this.createObjectToPost(task, this.urlCreateTask, "POST");
                this.postTask(object);
            }
        };
        ;
        TaskViewModel.prototype.updateItem = function () {
            if (this.hasValidData()) {
                this.taskToEdit = this.task();
            }
            var object = this.createObjectToPost(this.taskToEdit, this.urlUpdateTask, "PUT");
            this.postTask(object);
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