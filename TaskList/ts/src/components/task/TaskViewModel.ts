module KnockoutComponents{ 
    export class TaskViewModel {  
        taskToEdit: Models.ITask;
        task: KnockoutObservable<Models.ITask>;
        operation: KnockoutObservable<string>;
        isEditing: KnockoutObservable<boolean>;
        hasNoTitle: KnockoutObservable<boolean>;
        hasNoDescription: KnockoutObservable<boolean>;
        signatures: Array<any>;

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

        private insertNewTask() {
            const task = new Models.Task(ko.observable<string>(this.task().title()), ko.observable<string>(this.task().description()));
            ko.postbox.publish("task.list.insertNewTask", task);
            this.cleanData();
        }

        private selectToEdit = (task: Models.ITask) => {
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
            this.signatures.push(ko.postbox.subscribe("task.list.changeStatus", this.clearData, this));
        }                

        clearData() {
            this.cleanData();
        };

        addNewItem() {
            if (this.hasValidData()) {
                this.insertNewTask();
            }
        };

        updateItem() {
            if (this.hasValidData()) {
                this.taskToEdit = this.task();
            }
            ko.postbox.publish("task.list.updateTask", this.taskToEdit);
            this.cleanData();
        };
    }
}

ko.components.register("task-component", {
    viewModel: KnockoutComponents.TaskViewModel,
    template: { require: "text!../ts/src/components/task/TaskViewModel.html" }
});