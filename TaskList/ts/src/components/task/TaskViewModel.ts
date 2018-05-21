module KnockoutComponents{ 
    export class TaskViewModel {       
        
    }
}

ko.components.register('task-component', {
    viewModel: KnockoutComponents.TaskViewModel,
    template: { require: 'text!../ts/src/components/task/TaskViewModel.html' }
});