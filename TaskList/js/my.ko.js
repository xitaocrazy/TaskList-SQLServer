ko.bindingHandlers.bootstrapPopover = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var options = ko.utils.unwrapObservable(valueAccessor());
        $(element).popover(options);
    }
};