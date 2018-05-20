using System.Collections.Generic;
using TaskListApi.Models;

namespace TaskListApi.Services {
    public interface ITaskListService {
        IEnumerable<TaskListIten> GetTasks();
        bool CreateTask(TaskListIten taskListIten);
        bool UpdateTask(TaskListIten taskListIten);
        bool UpdateTaskStatus(int id, bool status);
        bool DeleteTask(int id);
    }
}