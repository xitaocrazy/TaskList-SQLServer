using System;
using System.ComponentModel.DataAnnotations;

namespace TaskListApi.Models {
    public class Task : IEquatable<Task> {
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

        public override string ToString() {
            var active = Status ? "On going" : "Done";
            return
                $"Title: {Title} - Description: {Description} - Status: {active} - Creation: {Creation} - LasUpdate: {LasUpdate} - Exclusion: {Exclusion} - Conclusion: {Conclusion}";
        }

        public override int GetHashCode() {
            unchecked {
                var hashCode = Id.GetHashCode();
                hashCode = (hashCode * 397) ^ Title?.GetHashCode() ?? 0;
                hashCode = (hashCode * 397) ^ Status.GetHashCode();
                hashCode = (hashCode * 397) ^ Description?.GetHashCode() ?? 0;
                hashCode = (hashCode * 397) ^ Creation.GetHashCode();
                hashCode = (hashCode * 397) ^ LasUpdate?.GetHashCode() ?? 0;
                hashCode = (hashCode * 397) ^ Exclusion?.GetHashCode() ?? 0;
                hashCode = (hashCode * 397) ^ Conclusion?.GetHashCode() ?? 0;
                return hashCode;
            }
        }

        public virtual bool Equals(Task other) {
            return other != null &&
                   Id == other.Id &&
                   String.Equals(Title, other.Title) &&
                   Status == other.Status &&
                   String.Equals(Description, other.Description) &&
                   Creation == other.Creation &&
                   DateTime.Equals(LasUpdate, other.LasUpdate) &&
                   DateTime.Equals(Exclusion, other.Exclusion) &&
                   DateTime.Equals(Conclusion, other.Conclusion);
        }

        public override bool Equals(object obj) {
            if (ReferenceEquals(null, obj)) {
                return false;
            }
            if (ReferenceEquals(this, obj)) {
                return true;
            }
            return obj.GetType() == GetType() && Equals((Task) obj);
        }

        public static bool operator ==(Task a, Task b) {
            return Equals(a, b);
        }

        public static bool operator !=(Task a, Task b) {
            return !Equals(a, b);
        }
    }
}