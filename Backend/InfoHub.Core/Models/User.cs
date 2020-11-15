using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace InfoHub.Core.Models
{
    [Table("User")]
    public class User : BaseEntity
    {
        public string Name { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

    }
}
