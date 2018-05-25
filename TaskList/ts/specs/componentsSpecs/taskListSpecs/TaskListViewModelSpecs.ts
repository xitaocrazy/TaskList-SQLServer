describe("With an TaskListViewModel", () => {
    var vm: KnockoutComponents.TaskListViewModel;
    var task1Json: any;
    var task2Json: any;
    var task3Json: any;
    var tasksJson: any;
    var task1: Models.ITask;
    var task2: Models.ITask;
    var task3: Models.ITask;
    var tasks: KnockoutObservableArray<Models.ITask>;
    var postSpy: jasmine.Spy;
    var alertSpy: jasmine.Spy;
    var logSpy: jasmine.Spy;
    var postBoxSpy: jasmine.Spy;
    var urlUpdateTask: string;
    beforeEach(() => {
        urlUpdateTask = "http://localhost:8880/api/TaskList/UpdateTaskStatus";

        task1Json = {
            Id: 1,
            Title: "Task 1",
            Status: true,
            Description: "Task 1",
            Creation: "2018-05-19T14:30:00",
            LasUpdate: "2018-05-23T20:01:24.477",
            Exclusion: null,
            Conclusion: null
        };
        task1 = new Models.Task(ko.observable<string>(task1Json.Title), ko.observable<string>(task1Json.Description));
        task1.id(task1Json.Id);
        task1.status(task1Json.Status);
        task1.creation(task1Json.Creation);
        task1.lastUpdate(task1Json.LastUpdate);
        task1.exclusion(task1Json.Exclusion);
        task1.conclusion(task1Json.Conclusion);

        task2Json = {
            Id: 2,
            Title: "Task 2",
            Status: false,
            Description: "Task 2",
            Creation: "2018-05-23T20:01:24.477",
            LasUpdate: "2018-05-23T20:01:24.477",
            Exclusion: null,
            Conclusion: "2018-05-19T14:30:00"
        };
        task2 = new Models.Task(ko.observable<string>(task2Json.Title), ko.observable<string>(task2Json.Description));
        task2.id(task2Json.Id);
        task2.status(task2Json.Status);
        task2.creation(task2Json.Creation);
        task2.lastUpdate(task2Json.LastUpdate);
        task2.exclusion(task2Json.Exclusion);
        task2.conclusion(task2Json.Conclusion);

        task3Json = {
            Id: 2,
            Title: "Task 2",
            Status: false,
            Description: "I could recover it.",
            Creation: "2018-05-23T20:01:24.477",
            LasUpdate: "2018-05-23T20:01:24.477",
            Exclusion: "2018-05-19T14:30:00",
            Conclusion: null
        };
        task3 = new Models.Task(ko.observable<string>(task3Json.Title), ko.observable<string>(task3Json.Description));
        task3.id(task3Json.Id);
        task3.status(task3Json.Status);
        task3.creation(task3Json.Creation);
        task3.lastUpdate(task3Json.LastUpdate);
        task3.exclusion(task3Json.Exclusion);
        task3.conclusion(task3Json.Conclusion);

        tasksJson = [task1Json, task2Json, task3Json];
        tasks = ko.observableArray<Models.ITask>([task1, task2, task3]);

        var params = {
            title: "OnGoing",
            taskList: tasks
        }
        vm = new KnockoutComponents.TaskListViewModel(params);
    });
    afterEach(() => {
        ko.postbox.reset();
    });
    describe("when build the object", () => {
        it("shloud set 'title' as expected", () => {
            expect(vm.title()).toEqual("OnGoing");
        });
        it("should set taskList with the expected quantity", () => {
            expect(vm.taskList().length).toEqual(tasks().length);
        });
        it("should set taskList", () => {
            for (let i = 0; i < tasks.length; i++) {
                validateTask(vm.taskList()[i], tasks()[i]);
            }
        });
    });
    describe("when call changeStatus", () => {
        var url: string;
        var object: any;
        beforeEach(() => {
            url = urlUpdateTask + "?id=" + task1.id() + "&status=" + !task1.status();
            object = {
                url: url,
                contentType: "application/json",
                type: "PUT"
            };
        });
        describe("when success", () => {
            beforeEach(() => {
                postSpy = spyOn($, "post").and.callFake(() => {
                    var def = $.Deferred();
                    def.resolve(tasksJson);
                    return def.promise();
                });
                postBoxSpy = spyOn(ko.postbox, "publish");                
                vm.changeStatus(task1);
            });
            it("should call post", () => { 
                expect(postSpy).toHaveBeenCalledWith(object);
            });
            it("should publish on task.list.reloadTasks", () => {
                expect(postBoxSpy).toHaveBeenCalled();
            });
        });
        describe("when error", () => {
            beforeEach(() => {
                postSpy = spyOn($, "post").and.callFake(() => {
                    var def = $.Deferred();
                    def.reject();
                    return def.promise();
                });
                alertSpy = spyOn(window, "alert");
                logSpy = spyOn(console, "log");
                postBoxSpy = spyOn(ko.postbox, "publish");
                vm.changeStatus(task1);
            });
            it("should call post", () => {
                expect(postSpy).toHaveBeenCalledWith(object);
            });
            it("should not publish on task.list.reloadTasks", () => {
                expect(postBoxSpy).not.toHaveBeenCalled();
            });
            it("should call alert", () => {
                expect(alertSpy).toHaveBeenCalledWith("Ops. Algo errado não está certo. Tente novamente");
            });
            it("should clear onGoingList", () => {
                expect(logSpy).toHaveBeenCalledWith("undefined. Erro: undefined");
            });
        });
    });
    describe("when call cancelTask", () => {
        var url: string;
        var object: any;
        beforeEach(() => {
            url = urlUpdateTask + "?id=" + task1.id();
            object = {
                url: url,
                contentType: "application/json",
                type: "DELETE"
            };
        });
        describe("when success", () => {
            beforeEach(() => {
                postSpy = spyOn($, "post").and.callFake(() => {
                    var def = $.Deferred();
                    def.resolve(tasksJson);
                    return def.promise();
                });
                postBoxSpy = spyOn(ko.postbox, "publish");
                vm.cancelTask(task1);
            });
            it("should call post", () => {
                expect(postSpy).toHaveBeenCalledWith(object);
            });
            it("should publish on task.list.reloadTasks", () => {
                expect(postBoxSpy).toHaveBeenCalled();
            });
        });
        describe("when error", () => {
            beforeEach(() => {
                postSpy = spyOn($, "post").and.callFake(() => {
                    var def = $.Deferred();
                    def.reject();
                    return def.promise();
                });
                alertSpy = spyOn(window, "alert");
                logSpy = spyOn(console, "log");
                postBoxSpy = spyOn(ko.postbox, "publish");
                vm.cancelTask(task1);
            });
            it("should call post", () => {
                expect(postSpy).toHaveBeenCalledWith(object);
            });
            it("should not publish on task.list.reloadTasks", () => {
                expect(postBoxSpy).not.toHaveBeenCalled();
            });
            it("should call alert", () => {
                expect(alertSpy).toHaveBeenCalledWith("Ops. Algo errado não está certo. Tente novamente");
            });
            it("should clear onGoingList", () => {
                expect(logSpy).toHaveBeenCalledWith("undefined. Erro: undefined");
            });
        });
    });
    describe("when call selectToEdit", () => {
        describe("when success", () => {
            beforeEach(() => {
                postBoxSpy = spyOn(ko.postbox, "publish");
                vm.selectToEdit(task1);
            });
            it("should publish on task.list.selectToEdit", () => {
                expect(postBoxSpy).toHaveBeenCalledWith("task.list.selectToEdit", task1);
            });
        });
    });
    function validateTask(expected: Models.ITask, actual: Models.ITask) {
        it("shloud set 'id' as expected", () => {
            expect(actual.id()).toEqual(actual.id());
        });
        it("shloud set 'title' as expected", () => {
            expect(actual.title()).toEqual(expected.title());
        });
        it("shloud set 'description' as expected", () => {
            expect(actual.description()).toEqual(expected.description());
        });
        it("shloud set 'status' as expected", () => {
            expect(actual.status()).toEqual(expected.status());
        });
        it("shloud set 'creation' as expected", () => {
            expect(actual.creation()).toEqual(expected.creation());
        });
        it("shloud set 'lastUpdate' as expected", () => {
            expect(actual.lastUpdate()).toEqual(expected.lastUpdate());
        });
        it("shloud set 'exclusion' as expected", () => {
            expect(actual.exclusion()).toEqual(expected.exclusion());
        });
        it("shloud set 'conclusion' as expected", () => {
            expect(actual.conclusion()).toEqual(expected.conclusion());
        });
    };
});