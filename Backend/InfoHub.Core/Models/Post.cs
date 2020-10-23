using System.ComponentModel.DataAnnotations.Schema;

namespace InfoHub.Core.Models
{
    [Table("Post")]
    public class Post : BaseEntity
    {
        public string Title { get; set; }
        public string Link { get; set; }
        public int Point { get; set; }
        public long CreatedAt { get; set; }
        public long UpdatedAt { get; set; }
        public long DeletedAt { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
