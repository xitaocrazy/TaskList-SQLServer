var Models;
(function (Models) {
    var Task = /** @class */ (function () {
        function Task(title, description) {
            this.title = title;
            this.description = description;
            this.setDefaultValues();
        }
        Task.prototype.setDefaultValues = function () {
            this.id = ko.observable(0);
            this.status = ko.observable(true);
            this.creation = ko.observable(new Date());
            this.lasUpdate = ko.observable(new Date());
            this.exclusion = ko.observable(new Date());
            this.conclusion = ko.observable(new Date());
        };
        return Task;
    }());
    Models.Task = Task;
})(Models || (Models = {}));
//# sourceMappingURL=Task.js.map