module KnockoutComponents{ 
    export class TaskViewModel {  
        taskToEdit: Models.ITask;
        task: KnockoutObservable<Models.ITask>;
        operation: KnockoutObservable<string>;
        isEditing: KnockoutObservable<boolean>;
        hasNoTitle: KnockoutObservable<boolean>;
        hasNoDescription: KnockoutObservable<boolean>;
        signatures: Array<any>;
        urlCreateTask = "http://localhost:8880/api/TaskList/CreateTask";
        urlUpdateTask = "http://localhost:8880/api/TaskList/UpdateTask";

        constructor(private params: any) {
            this.setDefaultValues();
            this.setSignatures();
        }

        private setDefaultValues() {
            this.task = ko.observable<Models.ITask>(new Models.Task(ko.observable<string>(""), ko.observable<string>("")));
            this.isEditing = ko.observable<boolean>(false);
            this.operation = ko.observable<string>("");
            this.hasNoTitle = ko.observable<boolean>(false);
            this.hasNoDescription = ko.observable<boolean>(false);
        }

        private setComputeds() {
            ko.computed(this.setOperation, this, { disposeWhenNodeIsRemoved: true });
        }

        private setOperation() {
            this.operation(this.isEditing() ? "Add new" : "Update");
        }

        private hasValidData() {
            this.hasNoTitle(this.task().title() === "");
            this.hasNoDescription(this.task().description() === "");
            return !this.hasNoTitle() && !this.hasNoDescription();
        }

        private cleanData() {
            this.task(new Models.Task(ko.observable<string>(""), ko.observable<string>("")));
            this.hasNoTitle(false);
            this.hasNoDescription(false);
            this.isEditing(false);
        }

        private createObjectToPost(task: Models.ITask, url: string, type: string) {
            const params = {
                "Id": task.id(),
                "Title": task.title(),
                "Status": task.status(),
                "Description": task.description(),
                "Creation": task.creation(),
                "LasUpdate": task.lastUpdate(),
                "Exclusion": task.exclusion(),
                "Conclusion": task.conclusion()
            };
            const object = {
                url: url,
                data: JSON.stringify(params),
                contentType: "application/json",
                type: type
            };
            return object;
        }

        private postTask(object: any) {
            $.post(object)
                .done(() => {
                    this.cleanData();
                    ko.postbox.publish("task.list.reloadTasks");
                })
                .fail((request, message, error) => {
                    this.showError(request, message, error);
                });
        };

        private showError (request: any, message: any, error: any)  {
            alert("Ops. Algo errado não está certo. Tente novamente");
            console.log(message + ". Erro: " + error);
        };

        private selectToEdit (task: Models.ITask) {
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

        private setSignatures() {
            this.signatures = [];
            this.signatures.push(ko.postbox.subscribe("task.list.selectToEdit", this.selectToEdit, this));
            this.signatures.push(ko.postbox.subscribe("task.list.reloadTasks", this.clearData, this));
        }  

        clearData() {
            this.cleanData();
        };

        addNewItem() {
            if (this.hasValidData()) {
                const task = new Models.Task(ko.observable<string>(this.task().title()), ko.observable<string>(this.task().description()));
                task.status(true);
                const object = this.createObjectToPost(task, this.urlCreateTask, "POST");
                this.postTask(object);
            }
        };

        updateItem() {
            if (this.hasValidData()) {
                this.taskToEdit = this.task();
            }
            const object = this.createObjectToPost(this.taskToEdit, this.urlUpdateTask, "PUT");
            this.postTask(object);
        };
    }
}

ko.components.register("task-component", {
    viewModel: KnockoutComponents.TaskViewModel,
    template: { require: "text!../ts/src/components/task/TaskViewModel.html" }
});