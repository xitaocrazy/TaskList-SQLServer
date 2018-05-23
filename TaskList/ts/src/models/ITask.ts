module Models {
    export interface ITask {
        id: KnockoutObservable<number>;
        title: KnockoutObservable<string>;
        status: KnockoutObservable<boolean>;
        description: KnockoutObservable<string>;
        creation: KnockoutObservable<string>;
        lastUpdate?: KnockoutObservable<string>;
        exclusion?: KnockoutObservable<string>;
        conclusion?: KnockoutObservable<string>;
        statusMessage: KnockoutObservable<string>;
    }
}