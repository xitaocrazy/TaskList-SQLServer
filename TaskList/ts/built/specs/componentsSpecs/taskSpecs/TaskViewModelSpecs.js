describe("With an TaskViewModel", function () {
    var vm;
    var urlCreateTask;
    var urlUpdateTask;
    var task;
    var taskToUpdate;
    var clearDataSpy;
    var postSpy;
    var postBoxSpy;
    var alertSpy;
    var logSpy;
    var addMessage;
    var updateMessage;
    beforeEach(function () {
        urlCreateTask = "http://localhost:8880/api/TaskList/CreateTask";
        urlUpdateTask = "http://localhost:8880/api/TaskList/UpdateTask";
        addMessage = "Add New Task";
        updateMessage = "Update Task";
        task = ko.observable(new Models.Task(ko.observable(""), ko.observable("")));
        taskToUpdate = new Models.Task(ko.observable("Task to Update"), ko.observable("Task to Update"));
        taskToUpdate.status(false);
        taskToUpdate.id(1);
        taskToUpdate.creation("2018-05-19T14:30:00");
        taskToUpdate.lastUpdate("2018-05-20:30:00");
        taskToUpdate.conclusion("2018-05-21T14:30:00");
        taskToUpdate.exclusion(null);
        vm = new KnockoutComponents.TaskViewModel();
    });
    afterEach(function () {
        ko.postbox.reset();
    });
    describe("when build the object", function () {
        it("should set task as expected", function () {
            validateTask(vm.task(), task());
        });
        it("shloud set 'isEditing' as expected", function () {
            expect(vm.isEditing()).toEqual(false);
        });
        it("shloud set 'operation' as expected", function () {
            expect(vm.operation()).toEqual(addMessage);
        });
        it("shloud set 'hasNoTitle' as expected", function () {
            expect(vm.hasNoTitle()).toEqual(false);
        });
        it("shloud set 'hasNoDescription' as expected", function () {
            expect(vm.hasNoDescription()).toEqual(false);
        });
        it("should register signatures", function () {
            expect(vm.signatures.length).toBe(2);
        });
    });
    describe("when set 'isEditing'", function () {
        describe("when set as true", function () {
            beforeEach(function () {
                vm.isEditing(true);
            });
            it("should set 'operation' as expected", function () {
                expect(vm.operation()).toEqual(updateMessage);
            });
        });
        describe("when set as false", function () {
            beforeEach(function () {
                vm.isEditing(false);
            });
            it("should set 'operation' as expected", function () {
                expect(vm.operation()).toEqual(addMessage);
            });
        });
    });
    describe("when something publish in task.list.selectToEdit", function () {
        beforeEach(function () {
            ko.postbox.publish("task.list.selectToEdit", taskToUpdate);
        });
        it("should set task as expected", function () {
            validateTask(vm.task(), taskToUpdate);
        });
        it("should set 'operation' as expected", function () {
            expect(vm.operation()).toEqual(updateMessage);
        });
    });
    describe("when something publish in task.list.reloadTasks", function () {
        beforeEach(function () {
            vm.task(taskToUpdate);
            clearDataSpy = spyOn(vm, "clearData").and.callThrough();
            ko.postbox.publish("task.list.reloadTasks");
        });
        it("should call clearData", function () {
            validateTask(vm.task(), taskToUpdate);
        });
    });
    describe("when call clearData", function () {
        beforeEach(function () {
            vm.task(taskToUpdate);
            vm.clearData();
        });
        it("should set task as expected", function () {
            validateTask(vm.task(), task());
        });
        it("shloud set 'isEditing' as expected", function () {
            expect(vm.isEditing()).toEqual(false);
        });
        it("shloud set 'operation' as expected", function () {
            expect(vm.operation()).toEqual(addMessage);
        });
        it("shloud set 'hasNoTitle' as expected", function () {
            expect(vm.hasNoTitle()).toEqual(false);
        });
        it("shloud set 'hasNoDescription' as expected", function () {
            expect(vm.hasNoDescription()).toEqual(false);
        });
    });
    describe("when call addNewItem", function () {
        describe("when has no title", function () {
            beforeEach(function () {
                postSpy = spyOn($, "post");
                vm.task(taskToUpdate);
                vm.task().title("");
                vm.addNewItem();
            });
            it("shloud set 'hasNoTitle' as expected", function () {
                expect(vm.hasNoTitle()).toEqual(true);
            });
            it("should not call post", function () {
                expect(postSpy).not.toHaveBeenCalled();
            });
        });
        describe("when has no description", function () {
            beforeEach(function () {
                postSpy = spyOn($, "post");
                vm.task(taskToUpdate);
                vm.task().description("");
                vm.addNewItem();
            });
            it("shloud set 'hasNoDescription' as expected", function () {
                expect(vm.hasNoDescription()).toEqual(true);
            });
            it("should not call post", function () {
                expect(postSpy).not.toHaveBeenCalled();
            });
        });
        describe("when success", function () {
            beforeEach(function () {
                vm.task(taskToUpdate);
                postSpy = spyOn($, "post").and.callFake(function () {
                    var def = $.Deferred();
                    def.resolve();
                    return def.promise();
                });
                postBoxSpy = spyOn(ko.postbox, "publish");
                vm.addNewItem();
            });
            it("should call post", function () {
                taskToUpdate.id(0);
                taskToUpdate.status(true);
                taskToUpdate.creation("");
                taskToUpdate.lastUpdate("");
                taskToUpdate.exclusion("");
                taskToUpdate.conclusion("");
                var object = createObjectToPost(taskToUpdate, urlCreateTask, "POST");
                expect(postSpy).toHaveBeenCalledWith(object);
            });
            it("should publish on task.list.reloadTasks", function () {
                expect(postBoxSpy).toHaveBeenCalled();
            });
            it("should set task as expected", function () {
                validateTask(vm.task(), task());
            });
        });
        describe("when error", function () {
            beforeEach(function () {
                vm.task(taskToUpdate);
                postSpy = spyOn($, "post").and.callFake(function () {
                    var def = $.Deferred();
                    def.reject();
                    return def.promise();
                });
                alertSpy = spyOn(window, "alert");
                logSpy = spyOn(console, "log");
                postBoxSpy = spyOn(ko.postbox, "publish");
                vm.addNewItem();
            });
            it("should call post", function () {
                taskToUpdate.id(0);
                taskToUpdate.status(true);
                taskToUpdate.creation("");
                taskToUpdate.lastUpdate("");
                taskToUpdate.exclusion("");
                taskToUpdate.conclusion("");
                var object = createObjectToPost(taskToUpdate, urlCreateTask, "POST");
                expect(postSpy).toHaveBeenCalledWith(object);
            });
            it("should not publish on task.list.reloadTasks", function () {
                expect(postBoxSpy).not.toHaveBeenCalled();
            });
            it("should call alert", function () {
                expect(alertSpy).toHaveBeenCalledWith("Ops. Algo errado n�o est� certo. Tente novamente");
            });
            it("should clear onGoingList", function () {
                expect(logSpy).toHaveBeenCalledWith("undefined. Erro: undefined");
            });
            it("should set task as expected", function () {
                validateTask(vm.task(), taskToUpdate);
            });
        });
    });
    describe("when call updateItem", function () {
        describe("when has no title", function () {
            beforeEach(function () {
                postSpy = spyOn($, "post");
                vm.task(taskToUpdate);
                vm.task().title("");
                vm.updateItem();
            });
            it("shloud set 'hasNoTitle' as expected", function () {
                expect(vm.hasNoTitle()).toEqual(true);
            });
            it("should not call post", function () {
                expect(postSpy).not.toHaveBeenCalled();
            });
        });
        describe("when has no description", function () {
            beforeEach(function () {
                postSpy = spyOn($, "post");
                vm.task(taskToUpdate);
                vm.task().description("");
                vm.updateItem();
            });
            it("shloud set 'hasNoDescription' as expected", function () {
                expect(vm.hasNoDescription()).toEqual(true);
            });
            it("should not call post", function () {
                expect(postSpy).not.toHaveBeenCalled();
            });
        });
        describe("when success", function () {
            beforeEach(function () {
                vm.task(taskToUpdate);
                postSpy = spyOn($, "post").and.callFake(function () {
                    var def = $.Deferred();
                    def.resolve();
                    return def.promise();
                });
                postBoxSpy = spyOn(ko.postbox, "publish");
                vm.updateItem();
            });
            it("should call post", function () {
                var object = createObjectToPost(taskToUpdate, urlUpdateTask, "PUT");
                expect(postSpy).toHaveBeenCalledWith(object);
            });
            it("should publish on task.list.reloadTasks", function () {
                expect(postBoxSpy).toHaveBeenCalled();
            });
            it("should set task as expected", function () {
                validateTask(vm.task(), task());
            });
        });
        describe("when error", function () {
            beforeEach(function () {
                vm.task(taskToUpdate);
                postSpy = spyOn($, "post").and.callFake(function () {
                    var def = $.Deferred();
                    def.reject();
                    return def.promise();
                });
                alertSpy = spyOn(window, "alert");
                logSpy = spyOn(console, "log");
                postBoxSpy = spyOn(ko.postbox, "publish");
                vm.updateItem();
            });
            it("should call post", function () {
                var object = createObjectToPost(taskToUpdate, urlUpdateTask, "PUT");
                expect(postSpy).toHaveBeenCalledWith(object);
            });
            it("should not publish on task.list.reloadTasks", function () {
                expect(postBoxSpy).not.toHaveBeenCalled();
            });
            it("should call alert", function () {
                expect(alertSpy).toHaveBeenCalledWith("Ops. Algo errado n�o est� certo. Tente novamente");
            });
            it("should clear onGoingList", function () {
                expect(logSpy).toHaveBeenCalledWith("undefined. Erro: undefined");
            });
            it("should set task as expected", function () {
                validateTask(vm.task(), taskToUpdate);
            });
        });
    });
    describe("when call dispose", function () {
        beforeEach(function () {
            vm.signatures.forEach(function (assinatura) {
                spyOn(assinatura, "dispose");
            });
            vm.dispose();
        });
        it("should call dispose em each signature", function () {
            vm.signatures.forEach(function (signature) {
                expect(signature.dispose).toHaveBeenCalled();
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
    function createObjectToPost(taskToPost, url, type) {
        var params = {
            "Id": taskToPost.id(),
            "Title": taskToPost.title(),
            "Status": taskToPost.status(),
            "Description": taskToPost.description(),
            "Creation": taskToPost.creation(),
            "LastUpdate": taskToPost.lastUpdate(),
            "Exclusion": taskToPost.exclusion(),
            "Conclusion": taskToPost.conclusion()
        };
        var object = {
            url: url,
            data: JSON.stringify(params),
            contentType: "application/json",
            type: type
        };
        return object;
    }
});
//# sourceMappingURL=TaskViewModelSpecs.js.map