module Models {
    export interface ITask {
        id: KnockoutObservable<number>;
        title: KnockoutObservable<string>;
        status: KnockoutObservable<boolean>;
        description: KnockoutObservable<string>;
        creation: KnockoutObservable<Date>;
        lasUpdate: KnockoutObservable<Date>;
        exclusion: KnockoutObservable<Date>;
        conclusion: KnockoutObservable<Date>;
    }    
}