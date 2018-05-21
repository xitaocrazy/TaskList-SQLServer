var ViewModels;
(function (ViewModels) {
    var IndexViewModel = /** @class */ (function () {
        function IndexViewModel() {
            var _this = this;
            this.markAsDone = function (item) {
                _this.taskList.remove(item);
                _this.doneList.push(item);
            };
            this.markAsOnGoing = function (item) {
                _this.doneList.remove(item);
                _this.taskList.push(item);
            };
            this.title = ko.observable("");
            this.description = ko.observable("");
            this.taskList = ko.observableArray([]);
            this.doneList = ko.observableArray([]);
            this.hasNoTitle = ko.observable(false);
            this.hasNoDescription = ko.observable(false);
            this.invalidKeyMessage = ko.observable("");
            this.isInvalidKey = ko.computed(function () {
                return _this.hasNoTitle();
            });
        }
        IndexViewModel.prototype.init = function () {
        };
        IndexViewModel.prototype.addNewItem = function () {
            if (this.hasValidData()) {
                this.insertNewItem();
            }
        };
        ;
        IndexViewModel.prototype.hasValidData = function () {
            this.hasNoTitle(this.title() === "");
            this.hasNoDescription(this.description() === "");
            return !this.hasNoTitle() && !this.hasNoDescription();
        };
        IndexViewModel.prototype.insertNewItem = function () {
            var task = new Models.Task(ko.observable(this.title()), ko.observable(this.description()));
            this.taskList.push(task);
            this.cleanData();
        };
        IndexViewModel.prototype.cleanData = function () {
            this.title("");
            this.description("");
            this.hasNoTitle(false);
            this.hasNoDescription(false);
        };
        return IndexViewModel;
    }());
    ViewModels.IndexViewModel = IndexViewModel;
})(ViewModels || (ViewModels = {}));
//# sourceMappingURL=IndexViewModel.js.map