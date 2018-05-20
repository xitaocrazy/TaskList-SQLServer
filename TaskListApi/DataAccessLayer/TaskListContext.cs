using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using TaskListApi.Models;

namespace TaskListApi.DataAccessLayer {
    public class TaskListContext : DbContext {
        public TaskListContext(string connectionString) : base(connectionString) {
        }

        public DbSet<Task> Students { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder) {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}