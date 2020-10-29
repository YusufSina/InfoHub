using System.ComponentModel.DataAnnotations.Schema;

namespace InfoHub.Core.Models
{
    [Table("CategoryPost")]
    public class CategoryPost : BaseEntity
    {
        public int PostId { get; set; }
        public Post Post { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
