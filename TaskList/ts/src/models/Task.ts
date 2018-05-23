module Models {
    export class Task implements ITask {
        statusMessage: KnockoutObservable<string>;
        actionMessage: KnockoutObservable<string>;
        isCancelled: KnockoutObservable<boolean>;

        constructor(public title: KnockoutObservable<string>, public description: KnockoutObservable<string>,
            public id: KnockoutObservable<number> = ko.observable<number>(0),
            public status: KnockoutObservable<boolean> = ko.observable<boolean>(true),
            public creation: KnockoutObservable<string> = ko.observable<string>(""),
            public lastUpdate: KnockoutObservable<string> = ko.observable<string>(""),
            public exclusion: KnockoutObservable<string> = ko.observable<string>(""),
            public conclusion: KnockoutObservable<string> = ko.observable<string>("")) {
            this.setDefaultValues();
            this.setComputeds();
        }

        private setDefaultValues() {
            this.statusMessage = ko.observable<string>("");
            this.actionMessage = ko.observable<string>("");
            this.isCancelled = ko.observable<boolean>(false);
        }

        private setComputeds() {
            ko.computed(this.setStatusMessage, this, { disposeWhenNodeIsRemoved: true });
            ko.computed(this.setActionMessage, this, { disposeWhenNodeIsRemoved: true });
        }

        private setStatusMessage() {
            this.isCancelled(false);
            if (this.exclusion() !== null && this.exclusion() !== "") {
                this.isCancelled(true);
                this.statusMessage("Cancelled");
            } else if (this.conclusion() !== null && this.conclusion() !== "") {
                this.statusMessage("Done");
            } else {
                this.statusMessage("On going"); 
            }                       
        }

        private setActionMessage() {
            this.actionMessage(this.status() ? "Finish" : "Reopen");
        }
    }
}