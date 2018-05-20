using System;

namespace TaskListApi.Models {
    public class TaskListIten {
        public int Id { get; set; }
        public string Title { get; set; }        
        public bool Status { get; set; }
        public string Description { get; set; }
        public DateTime Creation { get; set; }
        public DateTime? LasUpdate { get; set; }
        public DateTime? Exclusion { get; set; }
        public DateTime? Conclusion { get; set; }
    }
}