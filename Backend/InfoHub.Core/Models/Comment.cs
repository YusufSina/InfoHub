using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace InfoHub.Core.Models
{
    [Table("Comment")]
    public class Comment : BaseEntity
    {
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        public DateTime DeletedAt { get; set; } = DateTime.Now;
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        public int PostId { get; set; }
        [ForeignKey("PostId")]
        public Post Post { get; set; }
        public int CommentId { get; set; }
        public List<Comment> Relies { get; set; }
    }
}
