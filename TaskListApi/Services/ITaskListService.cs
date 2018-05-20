using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using TaskListApi.Models;

namespace TaskListApi.Services {
    public interface ITaskListService {
        IEnumerable<TaskListItem> GetTasks(Expression<Func<TaskListItem, bool>> filter = null, Func<IQueryable<TaskListItem>, IOrderedQueryable<TaskListItem>> orderBy = null, string includeProperties = "");
        void CreateTask(TaskListItem taskListItem);
        void UpdateTask(TaskListItem taskListItem);
        void UpdateTaskStatus(int id, bool status);
        void DeleteTask(int id);
        void Dispose();
    }
}