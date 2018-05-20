using TaskListApi.Models;

namespace TaskListApi.DataBase {
    public interface IUnitOfWork {
        Repository<TaskListIten> TaskListItenRepository { get; }

        void Save();

        void Dispose(bool disposing);

        void Dispose();
    }
}