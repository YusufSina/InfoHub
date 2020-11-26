using InfoHub.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace InfoHub.Core.Dtos
{
   public class PostDto : BaseEntity
    {
        public string Title { get; set; }
        public string Link { get; set; }
        public int UserId { get; set; }
        public int CategoryId { get; set; }
    }
}
