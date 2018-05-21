var KnockoutComponents;
(function (KnockoutComponents) {
    var TaskViewModel = /** @class */ (function () {
        function TaskViewModel() {
        }
        return TaskViewModel;
    }());
    KnockoutComponents.TaskViewModel = TaskViewModel;
})(KnockoutComponents || (KnockoutComponents = {}));
ko.components.register('task-component', {
    viewModel: KnockoutComponents.TaskViewModel,
    template: { require: 'text!../ts/src/components/task/TaskViewModel.html' }
});
//# sourceMappingURL=TaskViewModel.js.map