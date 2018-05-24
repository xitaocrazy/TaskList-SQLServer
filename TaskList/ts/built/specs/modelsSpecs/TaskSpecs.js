describe("With an Task", function () {
    var task;
    var title = "Task 1";
    var description = "Task 1 description";
    beforeEach(function () {
        task = new Models.Task(ko.observable(title), ko.observable(description));
    });
    describe("when build the object", function () {
        it("shloud set 'id' as expected", function () {
            expect(task.id()).toEqual(0);
        });
        it("shloud set 'title' as expected", function () {
            expect(task.title()).toEqual(title);
        });
        it("shloud set 'description' as expected", function () {
            expect(task.description()).toEqual(description);
        });
        it("shloud set 'status' as expected", function () {
            expect(task.status()).toEqual(true);
        });
        it("shloud set 'creation' as expected", function () {
            expect(task.creation()).toEqual("");
        });
        it("shloud set 'lastUpdate' as expected", function () {
            expect(task.lastUpdate()).toEqual("");
        });
        it("shloud set 'exclusion' as expected", function () {
            expect(task.exclusion()).toEqual("");
        });
        it("shloud set 'conclusion' as expected", function () {
            expect(task.conclusion()).toEqual("");
        });
    });
    describe("when define the status message", function () {
        describe("when was not excluded and not finished", function () {
            beforeEach(function () {
                task.exclusion("");
                task.conclusion("");
                task.status(true);
            });
            it("should set the expected value", function () {
                expect(task.statusMessage()).toEqual("On going");
            });
        });
        describe("when was excluded", function () {
            beforeEach(function () {
                task.exclusion("2018-05-23T20:01:24.477");
                task.conclusion("");
                task.status(true);
            });
            it("should set the expected value", function () {
                expect(task.statusMessage()).toEqual("Cancelled");
            });
        });
        describe("when was finished", function () {
            beforeEach(function () {
                task.exclusion("");
                task.conclusion("2018-05-23T20:01:24.477");
                task.status(true);
            });
            it("should set the expected value", function () {
                expect(task.statusMessage()).toEqual("Done");
            });
        });
    });
    describe("when define the action message", function () {
        describe("when status = true", function () {
            beforeEach(function () {
                task.status(true);
            });
            it("should set the expected value", function () {
                expect(task.actionMessage()).toEqual("Finish");
            });
        });
        describe("when status = false", function () {
            beforeEach(function () {
                task.status(false);
            });
            it("should set the expected value", function () {
                expect(task.actionMessage()).toEqual("Reopen");
            });
        });
    });
});
//# sourceMappingURL=TaskSpecs.js.map