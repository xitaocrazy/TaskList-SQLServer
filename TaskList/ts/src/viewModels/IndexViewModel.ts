module ViewModels {
    export class IndexViewModel {
        title: KnockoutObservable<string>;
        description: KnockoutObservable<string>;
        taskList: KnockoutObservableArray<Models.ITask>;
        doneList: KnockoutObservableArray<Models.ITask>;
        hasNoTitle: KnockoutObservable<boolean>;
        hasNoDescription: KnockoutObservable<boolean>;
        invalidKeyMessage: KnockoutObservable<string>;
        isInvalidKey: KnockoutComputed<boolean>;

        constructor() {
            this.title = ko.observable<string>("");
            this.description = ko.observable<string>("");
            this.taskList = ko.observableArray<Models.ITask>([]);
            this.doneList = ko.observableArray<Models.ITask>([]);
            this.hasNoTitle = ko.observable<boolean>(false);
            this.hasNoDescription = ko.observable<boolean>(false);
            this.invalidKeyMessage = ko.observable<string>("");
            this.isInvalidKey = ko.computed(() => {
                return this.hasNoTitle();
            });
        }

        init() {
        }

        addNewItem() {
            if (this.hasValidData()) {
                this.insertNewItem();
            }
        };

        markAsDone = (item: Models.ITask) => {
            this.taskList.remove(item);
            this.doneList.push(item);            
        };

        markAsOnGoing = (item: Models.ITask) => {
            this.doneList.remove(item);
            this.taskList.push(item);
        };

        private hasValidData() {
            this.hasNoTitle(this.title() === "");
            this.hasNoDescription(this.description() === "");
            return !this.hasNoTitle() && !this.hasNoDescription();
        }

        private insertNewItem() {
            const task = new Models.Task(ko.observable<string>(this.title()), ko.observable<string>(this.description()));
            this.taskList.push(task);
            this.cleanData();
        }

        private cleanData() {
            this.title("");
            this.description("");
            this.hasNoTitle(false);
            this.hasNoDescription(false);
        }
    }
}