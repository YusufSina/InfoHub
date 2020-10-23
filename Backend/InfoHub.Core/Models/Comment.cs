namespace InfoHub.Core.Models
{
    public class Comment : BaseEntity
    {
        public string Content { get; set; }
        public string Link { get; set; }
        public int Point { get; set; }
        public long CreatedAt { get; set; }
        public long UpdatedAt { get; set; }
        public long DeletedAt { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int PostId { get; set; }
        public Post Post { get; set; }
        public int CommentId { get; set; }
        public Comment RelyComment { get; set; }
    }
}
