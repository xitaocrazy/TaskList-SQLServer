using System;
using System.Collections.Generic;
using System.Data.Entity;
using TaskListApi.Models;

namespace TaskListApi.DataAccessLayer {
    public class TaskListInitializer : DropCreateDatabaseIfModelChanges<TaskListContext> {
        protected override void Seed(TaskListContext context) {
            var myInitialTasks = new List<TaskListItem> {
                new TaskListItem { Title = "Task 1", Status = true, Description = "That is my first task.", Creation = DateTime.Now},
                new TaskListItem { Title = "Task 2", Status = true, Description = "That is my second task.", Creation = DateTime.Now},
                new TaskListItem { Title = "Task 3", Status = true, Description = "That is my third task.", Creation = DateTime.Now}
            };

            myInitialTasks.ForEach(s => context.Students.Add(s));
            context.SaveChanges();
        }
    }
}