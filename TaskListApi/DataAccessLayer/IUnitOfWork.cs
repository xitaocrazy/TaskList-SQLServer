using TaskListApi.Models;

namespace TaskListApi.DataAccessLayer {
    public interface IUnitOfWork {
        Repository<TaskListItem> TaskListItenRepository { get; }
        void Save();
        void Dispose();
    }
}