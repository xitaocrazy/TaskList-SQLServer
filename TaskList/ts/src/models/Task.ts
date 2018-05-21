module Models {
    export class Task implements ITask {
        id: KnockoutObservable<number>;
        status: KnockoutObservable<boolean>;
        creation: KnockoutObservable<Date>;
        lasUpdate: KnockoutObservable<Date>;
        exclusion: KnockoutObservable<Date>;
        conclusion: KnockoutObservable<Date>;

        constructor(public title: KnockoutObservable<string>, public description: KnockoutObservable<string>) {
            this.setDefaultValues();
        }

        private setDefaultValues() {
            this.id = ko.observable<number>(0);
            this.status = ko.observable<boolean>(true);
            this.creation = ko.observable(new Date());
            this.lasUpdate = ko.observable(new Date());
            this.exclusion = ko.observable(new Date());
            this.conclusion = ko.observable(new Date());
        }
    }
}