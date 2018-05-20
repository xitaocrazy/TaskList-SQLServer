using System.Data.Entity;
using TaskListApi.Models;

namespace TaskListApi.DataBase {
    public class TaskListContext : DbContext {
        public TaskListContext(string connectionString) : base(connectionString) {
        }

        public DbSet<TaskListIten> Students { get; set; }
    }
}