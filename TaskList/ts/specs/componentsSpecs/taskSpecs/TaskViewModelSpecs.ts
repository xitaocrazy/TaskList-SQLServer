describe("With an TaskViewModel", () => {
    var vm: KnockoutComponents.TaskViewModel;
    var urlCreateTask: string;
    var urlUpdateTask: string;
    var task: KnockoutObservable<Models.ITask>;
    var taskToUpdate: Models.ITask;
    var clearDataSpy: jasmine.Spy;
    var postSpy: jasmine.Spy;
    var postBoxSpy: jasmine.Spy;
    var alertSpy: jasmine.Spy;
    var logSpy: jasmine.Spy;
    var addMessage: string;
    var updateMessage: string;
    beforeEach(() => {
        urlCreateTask = "http://localhost:8880/api/TaskList/CreateTask";
        urlUpdateTask = "http://localhost:8880/api/TaskList/UpdateTask";
        addMessage = "Add New Task";
        updateMessage = "Update Task";

        task = ko.observable<Models.ITask>(new Models.Task(ko.observable<string>(""), ko.observable<string>("")));
        taskToUpdate = new Models.Task(ko.observable<string>("Task to Update"), ko.observable<string>("Task to Update"));
        taskToUpdate.status(false);
        taskToUpdate.id(1);
        taskToUpdate.creation("2018-05-19T14:30:00");
        taskToUpdate.lastUpdate("2018-05-20:30:00");
        taskToUpdate.conclusion("2018-05-21T14:30:00");
        taskToUpdate.exclusion(null);
        vm = new KnockoutComponents.TaskViewModel();
    });
    afterEach(() => {
        ko.postbox.reset();
    });
    describe("when build the object", () => {        
        it("should set task as expected", () => {
            validateTask(vm.task(), task());
        });
        it("shloud set 'isEditing' as expected", () => {
            expect(vm.isEditing()).toEqual(false);
        });
        it("shloud set 'operation' as expected", () => {
            expect(vm.operation()).toEqual(addMessage);
        });
        it("shloud set 'hasNoTitle' as expected", () => {
            expect(vm.hasNoTitle()).toEqual(false);
        });
        it("shloud set 'hasNoDescription' as expected", () => {
            expect(vm.hasNoDescription()).toEqual(false);
        });
        it("should register signatures", () => {
            expect(vm.signatures.length).toBe(2);
        });
    });
    describe("when set 'isEditing'", () => {
        describe("when set as true", () => {
            beforeEach(() => {
                vm.isEditing(true);
            });
            it("should set 'operation' as expected", () => {
                expect(vm.operation()).toEqual(updateMessage);
            });
        });
        describe("when set as false", () => {
            beforeEach(() => {
                vm.isEditing(false);
            });
            it("should set 'operation' as expected", () => {
                expect(vm.operation()).toEqual(addMessage);
            });
        });
    });
    describe("when something publish in task.list.selectToEdit", () => {
        beforeEach(() => {
            ko.postbox.publish("task.list.selectToEdit", taskToUpdate);
        });
        it("should set task as expected", () => {
            validateTask(vm.task(), taskToUpdate);
        });
        it("should set 'operation' as expected", () => {
            expect(vm.operation()).toEqual(updateMessage);
        });
    });
    describe("when something publish in task.list.reloadTasks", () => {
        beforeEach(() => {
            vm.task(taskToUpdate);
            clearDataSpy = spyOn(vm, "clearData").and.callThrough();
            ko.postbox.publish("task.list.reloadTasks");
        });
        it("should call clearData", () => {
            validateTask(vm.task(), taskToUpdate);
        });
    });
    describe("when call clearData", () => {
        beforeEach(() => {
            vm.task(taskToUpdate);
            vm.clearData();
        });
        it("should set task as expected", () => {
            validateTask(vm.task(), task());
        });
        it("shloud set 'isEditing' as expected", () => {
            expect(vm.isEditing()).toEqual(false);
        });
        it("shloud set 'operation' as expected", () => {
            expect(vm.operation()).toEqual(addMessage);
        });
        it("shloud set 'hasNoTitle' as expected", () => {
            expect(vm.hasNoTitle()).toEqual(false);
        });
        it("shloud set 'hasNoDescription' as expected", () => {
            expect(vm.hasNoDescription()).toEqual(false);
        });
    });
    describe("when call addNewItem", () => {
        describe("when has no title", () => {
            beforeEach(() => {
                postSpy = spyOn($, "post");
                vm.task(taskToUpdate);
                vm.task().title("");
                vm.addNewItem();
            });
            it("shloud set 'hasNoTitle' as expected", () => {
                expect(vm.hasNoTitle()).toEqual(true);
            });
            it("should not call post", () => {
                expect(postSpy).not.toHaveBeenCalled();
            });
        });
        describe("when has no description", () => {
            beforeEach(() => {
                postSpy = spyOn($, "post");
                vm.task(taskToUpdate);
                vm.task().description("");
                vm.addNewItem();
            });
            it("shloud set 'hasNoDescription' as expected", () => {
                expect(vm.hasNoDescription()).toEqual(true);
            });
            it("should not call post", () => {
                expect(postSpy).not.toHaveBeenCalled();
            });
        });
        describe("when success", () => {
            beforeEach(() => {
                vm.task(taskToUpdate);
                postSpy = spyOn($, "post").and.callFake(() => {
                    var def = $.Deferred();
                    def.resolve();
                    return def.promise();
                });
                postBoxSpy = spyOn(ko.postbox, "publish");
                vm.addNewItem();
            });
            it("should call post", () => {
                taskToUpdate.id(0);
                taskToUpdate.status(true);
                taskToUpdate.creation("");
                taskToUpdate.lastUpdate("");
                taskToUpdate.exclusion("");
                taskToUpdate.conclusion("");
                var object = createObjectToPost(taskToUpdate, urlCreateTask, "POST");
                expect(postSpy).toHaveBeenCalledWith(object);
            });
            it("should publish on task.list.reloadTasks", () => {
                expect(postBoxSpy).toHaveBeenCalled();
            });
            it("should set task as expected", () => {
                validateTask(vm.task(), task());
            });
        });
        describe("when error", () => {
            beforeEach(() => {
                vm.task(taskToUpdate);                
                postSpy = spyOn($, "post").and.callFake(() => {
                    var def = $.Deferred();
                    def.reject();
                    return def.promise();
                });
                alertSpy = spyOn(window, "alert");
                logSpy = spyOn(console, "log");
                postBoxSpy = spyOn(ko.postbox, "publish");
                vm.addNewItem();
            });
            it("should call post", () => {
                taskToUpdate.id(0);
                taskToUpdate.status(true);
                taskToUpdate.creation("");
                taskToUpdate.lastUpdate("");
                taskToUpdate.exclusion("");
                taskToUpdate.conclusion("");
                var object = createObjectToPost(taskToUpdate, urlCreateTask, "POST");                
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
            it("should set task as expected", () => {
                validateTask(vm.task(), taskToUpdate);
            });
        });
    });
    describe("when call updateItem", () => {
        describe("when has no title", () => {
            beforeEach(() => {
                postSpy = spyOn($, "post");
                vm.task(taskToUpdate);
                vm.task().title("");
                vm.updateItem();
            });
            it("shloud set 'hasNoTitle' as expected", () => {
                expect(vm.hasNoTitle()).toEqual(true);
            });
            it("should not call post", () => {
                expect(postSpy).not.toHaveBeenCalled();
            });
        });
        describe("when has no description", () => {
            beforeEach(() => {
                postSpy = spyOn($, "post");
                vm.task(taskToUpdate);
                vm.task().description("");
                vm.updateItem();
            });
            it("shloud set 'hasNoDescription' as expected", () => {
                expect(vm.hasNoDescription()).toEqual(true);
            });
            it("should not call post", () => {
                expect(postSpy).not.toHaveBeenCalled();
            });
        });
        describe("when success", () => {
            beforeEach(() => {
                vm.task(taskToUpdate);
                postSpy = spyOn($, "post").and.callFake(() => {
                    var def = $.Deferred();
                    def.resolve();
                    return def.promise();
                });
                postBoxSpy = spyOn(ko.postbox, "publish");
                vm.updateItem();
            });
            it("should call post", () => {
                var object = createObjectToPost(taskToUpdate, urlUpdateTask, "PUT");
                expect(postSpy).toHaveBeenCalledWith(object);
            });
            it("should publish on task.list.reloadTasks", () => {
                expect(postBoxSpy).toHaveBeenCalled();
            });
            it("should set task as expected", () => {
                validateTask(vm.task(), task());
            });
        });
        describe("when error", () => {
            beforeEach(() => {
                vm.task(taskToUpdate);
                postSpy = spyOn($, "post").and.callFake(() => {
                    var def = $.Deferred();
                    def.reject();
                    return def.promise();
                });
                alertSpy = spyOn(window, "alert");
                logSpy = spyOn(console, "log");
                postBoxSpy = spyOn(ko.postbox, "publish");
                vm.updateItem();
            });
            it("should call post", () => {
                var object = createObjectToPost(taskToUpdate, urlUpdateTask, "PUT");
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
            it("should set task as expected", () => {
                validateTask(vm.task(), taskToUpdate);
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
    function createObjectToPost(taskToPost: Models.ITask, url: string, type: string) {
        const params = {
            "Id": taskToPost.id(),
            "Title": taskToPost.title(),
            "Status": taskToPost.status(),
            "Description": taskToPost.description(),
            "Creation": taskToPost.creation(),
            "LastUpdate": taskToPost.lastUpdate(),
            "Exclusion": taskToPost.exclusion(),
            "Conclusion": taskToPost.conclusion()
        };
        const object = {
            url: url,
            data: JSON.stringify(params),
            contentType: "application/json",
            type: type
        };
        return object;
    }
});