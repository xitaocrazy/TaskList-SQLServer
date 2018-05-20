using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TaskListApi.Models;

namespace TaskListApi.Services {
    public class TaskListService : ITaskListService {
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