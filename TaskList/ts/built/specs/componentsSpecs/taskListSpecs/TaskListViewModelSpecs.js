describe("With an TaskListViewModel", function () {
    var vm;
    var task1Json;
    var task2Json;
    var task3Json;
    var tasksJson;
    var task1;
    var task2;
    var task3;
    var tasks;
    var postSpy;
    var alertSpy;
    var logSpy;
    var postBoxSpy;
    var urlUpdateTask;
    beforeEach(function () {
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
        task1 = new Models.Task(ko.observable(task1Json.Title), ko.observable(task1Json.Description));
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
        task2 = new Models.Task(ko.observable(task2Json.Title), ko.observable(task2Json.Description));
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
        task3 = new Models.Task(ko.observable(task3Json.Title), ko.observable(task3Json.Description));
        task3.id(task3Json.Id);
        task3.status(task3Json.Status);
        task3.creation(task3Json.Creation);
        task3.lastUpdate(task3Json.LastUpdate);
        task3.exclusion(task3Json.Exclusion);
        task3.conclusion(task3Json.Conclusion);
        tasksJson = [task1Json, task2Json, task3Json];
        tasks = ko.observableArray([task1, task2, task3]);
        var params = {
            title: "OnGoing",
            taskList: tasks
        };
        vm = new KnockoutComponents.TaskListViewModel(params);
    });
    afterEach(function () {
        ko.postbox.reset();
    });
    describe("when build the object", function () {
        it("shloud set 'title' as expected", function () {
            expect(vm.title()).toEqual("OnGoing");
        });
        it("should set taskList with the expected quantity", function () {
            expect(vm.taskList().length).toEqual(tasks().length);
        });
        it("should set taskList", function () {
            for (var i = 0; i < tasks.length; i++) {
                validateTask(vm.taskList()[i], tasks()[i]);
            }
        });
    });
    describe("when call changeStatus", function () {
        var url;
        var object;
        beforeEach(function () {
            url = urlUpdateTask + "?id=" + task1.id() + "&status=" + !task1.status();
            object = {
                url: url,
                contentType: "application/json",
                type: "PUT"
            };
        });
        describe("when success", function () {
            beforeEach(function () {
                postSpy = spyOn($, "post").and.callFake(function () {
                    var def = $.Deferred();
                    def.resolve(tasksJson);
                    return def.promise();
                });
                postBoxSpy = spyOn(ko.postbox, "publish");
                vm.changeStatus(task1);
            });
            it("should call post", function () {
                expect(postSpy).toHaveBeenCalledWith(object);
            });
            it("should publish on task.list.reloadTasks", function () {
                expect(postBoxSpy).toHaveBeenCalled();
            });
        });
        describe("when error", function () {
            beforeEach(function () {
                postSpy = spyOn($, "post").and.callFake(function () {
                    var def = $.Deferred();
                    def.reject();
                    return def.promise();
                });
                alertSpy = spyOn(window, "alert");
                logSpy = spyOn(console, "log");
                postBoxSpy = spyOn(ko.postbox, "publish");
                vm.changeStatus(task1);
            });
            it("should call post", function () {
                expect(postSpy).toHaveBeenCalledWith(object);
            });
            it("should not publish on task.list.reloadTasks", function () {
                expect(postBoxSpy).not.toHaveBeenCalled();
            });
            it("should call alert", function () {
                expect(alertSpy).toHaveBeenCalledWith("Ops. Algo errado não está certo. Tente novamente");
            });
            it("should clear onGoingList", function () {
                expect(logSpy).toHaveBeenCalledWith("undefined. Erro: undefined");
            });
        });
    });
    describe("when call cancelTask", function () {
        var url;
        var object;
        beforeEach(function () {
            url = urlUpdateTask + "?id=" + task1.id();
            object = {
                url: url,
                contentType: "application/json",
                type: "DELETE"
            };
        });
        describe("when success", function () {
            beforeEach(function () {
                postSpy = spyOn($, "post").and.callFake(function () {
                    var def = $.Deferred();
                    def.resolve(tasksJson);
                    return def.promise();
                });
                postBoxSpy = spyOn(ko.postbox, "publish");
                vm.cancelTask(task1);
            });
            it("should call post", function () {
                expect(postSpy).toHaveBeenCalledWith(object);
            });
            it("should publish on task.list.reloadTasks", function () {
                expect(postBoxSpy).toHaveBeenCalled();
            });
        });
        describe("when error", function () {
            beforeEach(function () {
                postSpy = spyOn($, "post").and.callFake(function () {
                    var def = $.Deferred();
                    def.reject();
                    return def.promise();
                });
                alertSpy = spyOn(window, "alert");
                logSpy = spyOn(console, "log");
                postBoxSpy = spyOn(ko.postbox, "publish");
                vm.cancelTask(task1);
            });
            it("should call post", function () {
                expect(postSpy).toHaveBeenCalledWith(object);
            });
            it("should not publish on task.list.reloadTasks", function () {
                expect(postBoxSpy).not.toHaveBeenCalled();
            });
            it("should call alert", function () {
                expect(alertSpy).toHaveBeenCalledWith("Ops. Algo errado não está certo. Tente novamente");
            });
            it("should clear onGoingList", function () {
                expect(logSpy).toHaveBeenCalledWith("undefined. Erro: undefined");
            });
        });
    });
    describe("when call selectToEdit", function () {
        describe("when success", function () {
            beforeEach(function () {
                postBoxSpy = spyOn(ko.postbox, "publish");
                vm.selectToEdit(task1);
            });
            it("should publish on task.list.selectToEdit", function () {
                expect(postBoxSpy).toHaveBeenCalledWith("task.list.selectToEdit", task1);
            });
        });
    });
    function validateTask(expected, actual) {
        it("shloud set 'id' as expected", function () {
            expect(actual.id()).toEqual(actual.id());
        });
        it("shloud set 'title' as expected", function () {
            expect(actual.title()).toEqual(expected.title());
        });
        it("shloud set 'description' as expected", function () {
            expect(actual.description()).toEqual(expected.description());
        });
        it("shloud set 'status' as expected", function () {
            expect(actual.status()).toEqual(expected.status());
        });
        it("shloud set 'creation' as expected", function () {
            expect(actual.creation()).toEqual(expected.creation());
        });
        it("shloud set 'lastUpdate' as expected", function () {
            expect(actual.lastUpdate()).toEqual(expected.lastUpdate());
        });
        it("shloud set 'exclusion' as expected", function () {
            expect(actual.exclusion()).toEqual(expected.exclusion());
        });
        it("shloud set 'conclusion' as expected", function () {
            expect(actual.conclusion()).toEqual(expected.conclusion());
        });
    }
    ;
});
//# sourceMappingURL=TaskListViewModelSpecs.js.map