module ViewModels {
    export class IndexViewModel {
        taskList: KnockoutObservableArray<Models.ITask>;
        onGoingList: KnockoutObservableArray<Models.ITask>;
        doneList: KnockoutObservableArray<Models.ITask>; 
        cancelledList: KnockoutObservableArray<Models.ITask>;
        signatures: Array<any>;
        urlGetAllTasks = "http://localhost:8880/api/TaskList/GetAllTasks";        

        constructor() {
            this.setDefaultValues();
            this.setComputeds();
            this.setSignatures();
            this.getAllTasks();
        }

        private setDefaultValues() {
            this.taskList = ko.observableArray<Models.ITask>([]);
            this.onGoingList = ko.observableArray<Models.ITask>([]);
            this.doneList = ko.observableArray<Models.ITask>([]);
            this.cancelledList = ko.observableArray<Models.ITask>([]);
        }

        private setComputeds() {
            ko.computed(this.setOnGoingList, this, { disposeWhenNodeIsRemoved: true });
            ko.computed(this.setDoneList, this, { disposeWhenNodeIsRemoved: true });
            ko.computed(this.setCancelledList, this, { disposeWhenNodeIsRemoved: true });
        }

        private setOnGoingList() {
            const taskList = ko.utils.arrayFilter(this.taskList(), (task) => {
                return task.status() && (task.exclusion() === null || task.exclusion() === "") && (task.conclusion() === null || task.conclusion() === "");
            });
            this.onGoingList(taskList);
        }

        private setDoneList() {
            const taskList = ko.utils.arrayFilter(this.taskList(), (task) => {
                return !task.status() && (task.exclusion() === null || task.exclusion() === "");
            });
            this.doneList(taskList);
        }    

        private setCancelledList() {
            const taskList = ko.utils.arrayFilter(this.taskList(), (task) => {
                return task.exclusion() !== null && task.exclusion() !== "";
            });
            this.cancelledList(taskList);
        }

        private getAllTasks() {
            this.taskList([]);
            $.getJSON(this.urlGetAllTasks)
                .done((result) => {
                    this.setTaskList(result);
                })
                .fail((request, message, error) => {
                    this.showError(request, message, error);
                });
        }

        private setTaskList(result: [any]) {            
            const taskList = ko.utils.arrayMap(result, (task) => {
                return new Models.Task(ko.observable<string>(task["Title"]),
                    ko.observable<string>(task["Description"]),
                    ko.observable<number>(task["Id"]),
                    ko.observable<boolean>(task["Status"]),
                    ko.observable<string>(task["Creation"]),
                    ko.observable<string>(task["LasUpdate"]),
                    ko.observable<string>(task["Exclusion"]),
                    ko.observable<string>(task["Conclusion"]));
            });
            this.taskList(taskList);
        };

        private showError (request: any, message: any, error: any) {
            alert("Ops. Algo errado n�o est� certo. Tente novamente");
            console.log(message + ". Erro: " + error);
        };
        
        private setSignatures() {
            this.signatures = [];
            this.signatures.push(ko.postbox.subscribe("task.list.reloadTasks", this.getAllTasks, this));
        }           

        dispose() {
            for (let i = 0; i < this.signatures.length; i++) {
                this.signatures[i].dispose();
            }
        }
    }
}