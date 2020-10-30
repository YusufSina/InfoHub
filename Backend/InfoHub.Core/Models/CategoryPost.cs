using System.ComponentModel.DataAnnotations.Schema;

namespace InfoHub.Core.Models
{
    [Table("CategoryPost")]
    public class CategoryPost : BaseEntity
    {
        public int PostId { get; set; }
        public int CategoryId { get; set; }
    }
}
