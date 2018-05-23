module KnockoutComponents {
    export class TaskListViewModel {
        title: KnockoutObservable<string>;
        taskList: KnockoutObservableArray<Models.ITask>;
        
        constructor(private params: any) {
            this.setDefaultValues();            
        }

        private setDefaultValues() {
            this.title = ko.observable<string>(this.params.title);
            this.taskList = this.params.taskList;
        }        

        selectToEdit = (task: Models.ITask) => {
            ko.postbox.publish("task.list.selectToEdit", task);
        };

        changeStatus = (task: Models.ITask) => {
            task.status(!task.status());
            ko.postbox.publish("task.list.changeStatus", task);
        };        
    }
}

ko.components.register("task-list-component", {
    viewModel: KnockoutComponents.TaskListViewModel,
    template: { require: "text!../ts/src/components/taskList/TaskListViewModel.html" }
});