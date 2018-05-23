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

        public IEnumerable<Task> GetTasks(Expression<Func<Task, bool>> filter = null, Func<IQueryable<Task>, IOrderedQueryable<Task>> orderBy = null, string includeProperties = "") {
            var tasks = _unitOfWork.TaskListItenRepository.Get(filter, orderBy, includeProperties);
            return tasks;
        }

        public void CreateTask(Task task) {
            task.Creation = DateTime.Now;
            _unitOfWork.TaskListItenRepository.Insert(task);
        }

        public void UpdateTask(Task task) {
            task.LasUpdate = DateTime.Now;
            _unitOfWork.TaskListItenRepository.Update(task);
        }

        public void UpdateTaskStatus(int id, bool status) {
            var task = _unitOfWork.TaskListItenRepository.GetById(id);
            if (task.Exclusion != null) {
                return;                
            }
            task.Status = status;
            if (status) { //When status = true, task was no finished or was reopened.
                task.Conclusion = null;
            }
            else {
                task.Conclusion = DateTime.Now;
            }
            UpdateTask(task);
        }

        public void DeleteTask(int id) {
            var task = _unitOfWork.TaskListItenRepository.GetById(id);
            task.Status = false;
            task.Exclusion = DateTime.Now;
            UpdateTask(task);
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