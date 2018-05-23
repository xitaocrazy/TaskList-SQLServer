module ViewModels {
    export class IndexViewModel {
        taskList: KnockoutObservableArray<Models.ITask>;
        onGoingList: KnockoutObservableArray<Models.ITask>;
        doneList: KnockoutObservableArray<Models.ITask>;        
        signatures: Array<any>;
        urlGetAllTasks = "http://localhost:8880/api/TaskList/GetAllTasks";
        urlCreateTask = "http://localhost:8880/api/TaskList/CreateTask";
        urlUpdateTask = "http://localhost:8880/api/TaskList/UpdateTask";

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

        private createObjectToPost(task: Models.ITask, url: string, type: string) {
            const params = {
                "Id": task.id(),
                "Title": task.title(),
                "Status": true,
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
                    this.getAllTasks();
                })
                .fail((request, message, error) => {
                    this.showError(request, message, error);
                });
        };

        private insertNewTask = (task: Models.ITask) => {
            var object = this.createObjectToPost(task, this.urlCreateTask, "POST");
            this.postTask(object);
        };        

        private updateTask = (task: Models.ITask) => {
            var object = this.createObjectToPost(task, this.urlUpdateTask, "PUT");
            this.postTask(object);
        };

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

        private setTaskList = (result: [any]) => {
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

        private showError = (request: any, message: any, error: any) => {
            console.log("Ops. Algo errado não está certo. Tente novamente"); 
            console.log(message + ". Erro: " + error); 
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