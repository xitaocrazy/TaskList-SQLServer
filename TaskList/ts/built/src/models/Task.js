var Models;
(function (Models) {
    var Task = /** @class */ (function () {
        function Task(title, description, id, status, creation, lastUpdate, exclusion, conclusion) {
            if (id === void 0) { id = ko.observable(0); }
            if (status === void 0) { status = ko.observable(true); }
            if (creation === void 0) { creation = ko.observable(""); }
            if (lastUpdate === void 0) { lastUpdate = ko.observable(""); }
            if (exclusion === void 0) { exclusion = ko.observable(""); }
            if (conclusion === void 0) { conclusion = ko.observable(""); }
            this.title = title;
            this.description = description;
            this.id = id;
            this.status = status;
            this.creation = creation;
            this.lastUpdate = lastUpdate;
            this.exclusion = exclusion;
            this.conclusion = conclusion;
            this.setDefaultValues();
            this.setComputeds();
        }
        Task.prototype.setDefaultValues = function () {
            this.statusMessage = ko.observable("");
        };
        Task.prototype.setComputeds = function () {
            ko.computed(this.setstatusMessage, this, { disposeWhenNodeIsRemoved: true });
        };
        Task.prototype.setstatusMessage = function () {
            this.statusMessage(this.status() ? "On going" : "Done");
        };
        return Task;
    }());
    Models.Task = Task;
})(Models || (Models = {}));
//# sourceMappingURL=Task.js.map