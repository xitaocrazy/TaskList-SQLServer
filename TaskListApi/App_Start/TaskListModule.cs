using System.Configuration;
using System.Data.Entity;
using Ninject.Modules;
using TaskListApi.DataAccessLayer;
using TaskListApi.Services;

namespace TaskListApi {
    public class TaskListModule : NinjectModule {
        public override void Load() {
            Bind<ITaskListService>().To<TaskListService>();
            Bind(typeof(IRepository<>)).To(typeof(Repository<>));
            Bind<IUnitOfWork>().To<UnitOfWork>();
            Bind<DbContext>().To<TaskListContext>().WithConstructorArgument("connectionString", c => ConfigurationManager.ConnectionStrings["TaskListDB"].ConnectionString);
        }
    }
}