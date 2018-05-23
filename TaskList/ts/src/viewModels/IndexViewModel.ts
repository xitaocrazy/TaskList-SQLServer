module ViewModels {
    export class IndexViewModel {
        taskList: KnockoutObservableArray<Models.ITask>;
        onGoingList: KnockoutObservableArray<Models.ITask>;
        doneList: KnockoutObservableArray<Models.ITask>;        
        signatures: Array<any>;

        constructor() {
            this.setDefaultValues();
            this.setComputeds();
            this.setSignatures();
        }

        private setDefaultValues() {
            this.taskList = ko.observableArray<Models.ITask>([]);
            this.onGoingList = ko.observableArray<Models.ITask>([]);
            this.doneList = ko.observableArray<Models.ITask>([]);
        }

        private setComputeds() {
            ko.computed(this.setOnGoingList, this, { disposeWhenNodeIsRemoved: true });
            ko.computed(this.setDoneList, this, { disposeWhenNodeIsRemoved: true });
        }

        private setOnGoingList() {
            const taskList = ko.utils.arrayFilter(this.taskList(), (task) => {
                return task.status();
            });
            this.onGoingList(taskList);
        }

        private setDoneList() {
            const taskList = ko.utils.arrayFilter(this.taskList(), (task) => {
                return !task.status();
            });
            this.doneList(taskList);
        }   

        private insertNewTask = (task: Models.ITask) => {
            task.id(this.taskList().length);
            this.taskList.push(task);
        };

        private updateTask = (task: Models.ITask) => {
            const oldTask = ko.utils.arrayFirst(this.taskList(), (item) => {
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

        private setSignatures() {
            this.signatures = [];
            this.signatures.push(ko.postbox.subscribe("task.list.insertNewTask", this.insertNewTask, this));
            this.signatures.push(ko.postbox.subscribe("task.list.updateTask", this.updateTask, this));
        }           

        dispose() {
            for (let i = 0; i < this.signatures.length; i++) {
                this.signatures[i].dispose();
            }
        }
    }
}