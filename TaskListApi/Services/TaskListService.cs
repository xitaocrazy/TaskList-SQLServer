using System.Collections.Generic;
using TaskListApi.DataBase;
using TaskListApi.Models;

namespace TaskListApi.Services {
    public class TaskListService : ITaskListService {
        private readonly IUnitOfWork _unitOfWork;

        public TaskListService(IUnitOfWork unitOfWork) {
            _unitOfWork = unitOfWork;
        }

        public IEnumerable<TaskListIten> GetTasks() {
            return new List<TaskListIten>();
        }

        public bool CreateTask(TaskListIten taskListIten) {
            return true;
        }

        public bool UpdateTask(TaskListIten taskListIten) {
            return true;
        }

        public bool UpdateTaskStatus(int id, bool status) {
            return true;
        }

        public bool DeleteTask(int id) {
            return true;
        }
    }
}