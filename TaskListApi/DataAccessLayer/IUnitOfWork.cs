using TaskListApi.Models;

namespace TaskListApi.DataAccessLayer {
    public interface IUnitOfWork {
        Repository<Task> TaskListItenRepository { get; }
        void Save();
        void Dispose();
    }
}