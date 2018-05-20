using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using TaskListApi.Models;

namespace TaskListApi.Services {
    public interface ITaskListService {
        IEnumerable<Task> GetTasks(Expression<Func<Task, bool>> filter = null, Func<IQueryable<Task>, IOrderedQueryable<Task>> orderBy = null, string includeProperties = "");
        void CreateTask(Task task);
        void UpdateTask(Task task);
        void UpdateTaskStatus(int id, bool status);
        void DeleteTask(int id);
        void Dispose();
    }
}