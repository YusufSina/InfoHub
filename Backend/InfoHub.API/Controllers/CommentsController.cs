using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InfoHub.Core.Dtos;
using InfoHub.Core.Helpers;
using InfoHub.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InfoHub.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentService _commentService;
        public CommentsController(ICommentService commentService)
        {
            _commentService = commentService;
        }
        [HttpGet("{postId}")]
        public async Task<ActionResult> GetAllComments([FromRoute] int postId,  [FromQuery] PaginationParameters paginationParameters)
        {
            var comments = await _commentService.GetAllCommentsByPostIdAsync(postId,paginationParameters);
            if (comments.Count == 0)
            {
                return new NoContentResult();
            }
            return new OkObjectResult(comments);
        }

        [HttpPost]
        public ActionResult AddComment([FromBody] CommentDto comment)
        {
            var userId = (int)HttpContext.Items["UserId"];
            comment.UserId = userId;
            var addedComment = _commentService.AddComment(comment);
            return new OkObjectResult(addedComment);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteComment([FromRoute] int id)
        {
            if (string.IsNullOrEmpty(id.ToString()))
            {
                return BadRequest();
            }
            _commentService.DeleteComment(id);
            return new OkResult();
        }

        [HttpPut]
        public ActionResult UpdateComment([FromBody] CommentDto comment)
        {
            _commentService.UpdateComment(comment);
            return new OkResult();
        }
    }
}
