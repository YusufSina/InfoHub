using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace InfoHub.Core.Models
{
    [Table("Post")]
    public class Post : BaseEntity
    {
        public string Title { get; set; }
        public string Link { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        public DateTime DeletedAt { get; set; } = DateTime.Now;
        [NotMapped]
        public int CommentCount { get; set; }
        [NotMapped]
        public int PointCount { get; set; }
        [NotMapped]
        public bool IsPointed { get; set; }
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        public List<Category> Categories { get; set; }
    }
}
