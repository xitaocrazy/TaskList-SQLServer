using System;
using System.ComponentModel.DataAnnotations;

namespace TaskListApi.Models {
    public class Task {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(20), MinLength(5)]
        public string Title { get; set; }
        [Required]
        public bool Status { get; set; }
        [Required]
        [MaxLength(200), MinLength(10)]
        public string Description { get; set; }
        [Required]
        public DateTime Creation { get; set; }
        public DateTime? LasUpdate { get; set; }
        public DateTime? Exclusion { get; set; }
        public DateTime? Conclusion { get; set; }
    }
}