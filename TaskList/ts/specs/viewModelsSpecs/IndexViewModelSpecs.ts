describe("With an IndexViewModel", () => {
    var vm: ViewModels.IndexViewModel;
    var task1Json: any;
    var task2Json: any;
    var task3Json: any;
    var tasksJson: any;
    var task1: Models.ITask;
    var task2: Models.ITask;
    var task3: Models.ITask;
    var tasks: [Models.ITask];
    var getJsonSpy: jasmine.Spy;
    var alertSpy: jasmine.Spy;
    var logSpy: jasmine.Spy;
    var urlGetAllTasks: string;
    beforeEach(() => {
        urlGetAllTasks = "http://localhost:8880/api/TaskList/GetAllTasks";

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
        tasks = [task1, task2, task3];
        
        vm = new ViewModels.IndexViewModel();
    });
    afterEach(() => {
        ko.postbox.reset();
        vm.dispose();
    });
    describe("when build the object", () => {
        it("shloud set 'taskList' as expected", () => {
            expect(vm.taskList()).toEqual([]);
        });
        it("shloud set 'onGoingList' as expected", () => {
            expect(vm.onGoingList()).toEqual([]);
        });
        it("shloud set 'doneList' as expected", () => {
            expect(vm.doneList()).toEqual([]);
        });
        it("shloud set 'cancelledList' as expected", () => {
            expect(vm.cancelledList()).toEqual([]);
        });
        it("should register signatures", () => {
            expect(vm.signatures.length).toBe(1);
        });
    });
    describe("when something publish in task.list.reloadTasks", () => {        
        describe("when success", () => {
            beforeEach(() => {
                getJsonSpy = spyOn($, "getJSON").and.callFake(() => {
                    var def = $.Deferred();
                    def.resolve(tasksJson);
                    return def.promise();
                });
                ko.postbox.publish("task.list.reloadTasks");
            });
            it("should call getJson", () => {
                expect(getJsonSpy).toHaveBeenCalledWith(urlGetAllTasks);
            });
            it("should set taskList with the expected quantity", () => {
                expect(vm.taskList().length).toEqual(tasks.length);
            });
            it("should set taskList", () => {
                for (let i = 0; i < tasks.length; i++) {
                    validateTask(vm.taskList()[i], tasks[i]);
                }                
            });
            it("should set onGoingList with the expected quantity", () => {
                expect(vm.onGoingList().length).toEqual(1);
            });
            it("should set onGoingList", () => {
                validateTask(vm.onGoingList()[0], task1);
            });
            it("should set doneList with the expected quantity", () => {
                expect(vm.doneList().length).toEqual(1);
            });
            it("should set doneList", () => {
                validateTask(vm.doneList()[0], task2);
            });
            it("should set cancelledList with the expected quantity", () => {
                expect(vm.cancelledList().length).toEqual(1);
            });
            it("should set cancelledList", () => {
                validateTask(vm.cancelledList()[0], task3);
            });
        });
        describe("when error", () => {
            beforeEach(() => {
                vm.taskList(tasks);
                getJsonSpy = spyOn($, "getJSON").and.callFake(() => {
                    var def = $.Deferred();
                    def.reject();
                    return def.promise();
                });
                alertSpy = spyOn(window, "alert");
                logSpy = spyOn(console, "log");
                ko.postbox.publish("task.list.reloadTasks");
            });
            it("should call getJson", () => {
                expect(getJsonSpy).toHaveBeenCalledWith(urlGetAllTasks);
            });
            it("should clear taskList", () => {
                expect(vm.taskList().length).toEqual(0);
            });
            it("should clear onGoingList", () => {
                expect(vm.onGoingList().length).toEqual(0);
            });
            it("should clear doneList", () => {
                expect(vm.doneList().length).toEqual(0);
            });
            it("should clear cancelledList", () => {
                expect(vm.cancelledList().length).toEqual(0);
            });
            it("should call alert", () => {
                expect(alertSpy).toHaveBeenCalledWith("Ops. Algo errado não está certo. Tente novamente");
            });
            it("should clear onGoingList", () => {
                expect(logSpy).toHaveBeenCalledWith("undefined. Erro: undefined");
            });
        });
    });
    describe("when call dispose", () => {
        beforeEach(() => {
            vm.signatures.forEach(assinatura => {
                spyOn(assinatura, "dispose");
            });
            vm.dispose();
        });
        it("should call dispose em each signature", () => {
            vm.signatures.forEach((signature) => {
                expect(signature.dispose).toHaveBeenCalled();
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