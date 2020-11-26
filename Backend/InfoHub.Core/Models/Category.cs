using System.ComponentModel.DataAnnotations.Schema;

namespace InfoHub.Core.Models
{
   [Table("Category")]
   public class Category : BaseEntity
    {
        public string Name { get; set; }
    }
}
