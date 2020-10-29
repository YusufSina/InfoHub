using InfoHub.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace InfoHub.Core.Dtos
{
    public class CommentDto : BaseEntity
    {
        public string Content { get; set; }
        public int UserId { get; set; }
        public int CommentId { get; set; }
        public int PostId { get; set; }
    }
}
