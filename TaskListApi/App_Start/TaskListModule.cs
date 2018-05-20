using Ninject.Modules;
using TaskListApi.Services;

namespace TaskListApi.App_Start {
    public class TaskListModule : NinjectModule {
        public override void Load() {
            Bind<ITaskListService>().To<TaskListService>();
        }
    }
}