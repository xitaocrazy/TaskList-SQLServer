using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using TaskListApi.DataAccessLayer;
using TaskListApi.Models;

namespace TaskListApi.Services {
    public class TaskListService : ITaskListService, IDisposable {
        private readonly IUnitOfWork _unitOfWork;
        private bool _disposed;

        public TaskListService(IUnitOfWork unitOfWork) {
            _unitOfWork = unitOfWork;
        }

        public IEnumerable<TaskListItem> GetTasks(Expression<Func<TaskListItem, bool>> filter = null, Func<IQueryable<TaskListItem>, IOrderedQueryable<TaskListItem>> orderBy = null, string includeProperties = "") {
            var tasks = _unitOfWork.TaskListItenRepository.Get(filter, orderBy, includeProperties);
            return tasks;
        }

        public void CreateTask(TaskListItem taskListItem) {
            _unitOfWork.TaskListItenRepository.Insert(taskListItem);
        }

        public void UpdateTask(TaskListItem taskListItem) {
            _unitOfWork.TaskListItenRepository.Update(taskListItem);
        }

        public void UpdateTaskStatus(int id, bool status) {
            var taskListItem = _unitOfWork.TaskListItenRepository.GetById(id);
            taskListItem.Status = status;
            UpdateTask(taskListItem);
        }

        public void DeleteTask(int id) {
            var taskListItem = _unitOfWork.TaskListItenRepository.GetById(id);
            taskListItem.Status = false;
            taskListItem.Exclusion = DateTime.Now;
            UpdateTask(taskListItem);
        }

        public void Dispose() {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing) {
            if (!_disposed) {
                if (disposing) {
                    _unitOfWork.Dispose();
                }
            }
            _disposed = true;
        }
    }
}