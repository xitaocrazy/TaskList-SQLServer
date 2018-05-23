module Models {
    export class Task implements ITask {
        statusMessage: KnockoutObservable<string>;

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
        }

        private setComputeds() {
            ko.computed(this.setstatusMessage, this, { disposeWhenNodeIsRemoved: true });
        }

        private setstatusMessage() {
            if (this.exclusion() !== null && this.exclusion() !== "") {
                this.statusMessage("Cancelled");
            } else if (this.conclusion() !== null && this.conclusion() !== "") {
                this.statusMessage("Done");
            } else {
                this.statusMessage("On going"); 
            }                       
        }
    }
}