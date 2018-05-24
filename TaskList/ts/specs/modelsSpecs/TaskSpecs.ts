describe("With an Task", () => {
    var task: Models.Task;
    var title = "Task 1";
    var description = "Task 1 description";
    beforeEach(() => {
        task = new Models.Task(ko.observable<string>(title), ko.observable<string>(description));
    });    
    describe("when build the object", () => {
        it("shloud set 'id' as expected", () => {
            expect(task.id()).toEqual(0);
        });
        it("shloud set 'title' as expected", () => {
            expect(task.title()).toEqual(title);
        });
        it("shloud set 'description' as expected", () => {
            expect(task.description()).toEqual(description);
        });
        it("shloud set 'status' as expected", () => {
            expect(task.status()).toEqual(true);
        });
        it("shloud set 'creation' as expected", () => {
            expect(task.creation()).toEqual("");
        });
        it("shloud set 'lastUpdate' as expected", () => {
            expect(task.lastUpdate()).toEqual("");
        });
        it("shloud set 'exclusion' as expected", () => {
            expect(task.exclusion()).toEqual("");
        });
        it("shloud set 'conclusion' as expected", () => {
            expect(task.conclusion()).toEqual("");
        });
    });
    describe("when define the status message", () => {
        describe("when was not excluded and not finished", () => {
            beforeEach(() => {
                task.exclusion("");
                task.conclusion("");
                task.status(true);
            });
            it("should set the expected value", () => {
                expect(task.statusMessage()).toEqual("On going");
            });
        });
        describe("when was excluded", () => {
            beforeEach(() => {
                task.exclusion("2018-05-23T20:01:24.477");
                task.conclusion("");
                task.status(true);
            });
            it("should set the expected value", () => {
                expect(task.statusMessage()).toEqual("Cancelled");
            });
        });
        describe("when was finished", () => {
            beforeEach(() => {
                task.exclusion("");
                task.conclusion("2018-05-23T20:01:24.477");
                task.status(true);
            });
            it("should set the expected value", () => {
                expect(task.statusMessage()).toEqual("Done");
            });
        });
    });
    describe("when define the action message", () => {
        describe("when status = true", () => {
            beforeEach(() => {
                task.status(true);
            });
            it("should set the expected value", () => {
                expect(task.actionMessage()).toEqual("Finish");
            });
        });
        describe("when status = false", () => {
            beforeEach(() => {
                task.status(false);
            });
            it("should set the expected value", () => {
                expect(task.actionMessage()).toEqual("Reopen");
            });
        });
    });
});