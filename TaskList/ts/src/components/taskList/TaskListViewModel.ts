module KnockoutComponents {
    export class TaskListViewModel {
        title: KnockoutObservable<string>;
        taskList: KnockoutObservableArray<Models.ITask>;
        urlUpdateTask = "http://localhost:8880/api/TaskList/UpdateTaskStatus";
        
        constructor(private params: any) {
            this.setDefaultValues();            
        }

        private setDefaultValues() {
            this.title = ko.observable<string>(this.params.title);
            this.taskList = this.params.taskList;
        }  

        private createObjectToPost(task: Models.ITask, type: string) {
            const url = this.urlUpdateTask + "?id=" + task.id() + "&status=" + !task.status();
            const object = {
                url: url,
                contentType: "application/json",
                type: type
            };
            return object;
        }

        private postTask(object: any) {
            $.post(object)
                .done(() => {
                    ko.postbox.publish("task.list.reloadTasks");
                })
                .fail((request, message, error) => {
                    this.showError(request, message, error);
                });
        };

        private showError = (request: any, message: any, error: any) => {
            alert("Ops. Algo errado não está certo. Tente novamente");
            console.log(message + ". Erro: " + error);
        };

        selectToEdit (task: Models.ITask) {
            ko.postbox.publish("task.list.selectToEdit", task);
        };

        changeStatus = (task: Models.ITask) => {
            if (task.exclusion() === null || task.exclusion() === "") {
                const object = this.createObjectToPost(task, "PUT");
                this.postTask(object);
            }
        };        
    }
}

ko.components.register("task-list-component", {
    viewModel: KnockoutComponents.TaskListViewModel,
    template: { require: "text!../ts/src/components/taskList/TaskListViewModel.html" }
});