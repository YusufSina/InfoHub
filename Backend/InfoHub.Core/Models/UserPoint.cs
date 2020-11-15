using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace InfoHub.Core.Models
{
    [Table("UserPoint")]
    public class UserPoint : BaseEntity
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int PostId { get; set; }
    }
}
