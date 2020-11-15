using InfoHub.API.Attributes;
using InfoHub.Core.Dtos;
using InfoHub.Core.Helpers;
using InfoHub.Core.Interfaces;
using InfoHub.Core.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InfoHub.API.Controllers
{
    [Route("api/[controller]")]
    //[Authorize]
    public class PostsController : ControllerBase
    {
        private readonly IPostService _postService;
        public PostsController(IPostService postService)
        {
            _postService = postService;
        }
        [HttpGet]
        public async Task<ActionResult> GetAllPosts([FromQuery] PaginationParameters paginationParameters)
        {
            var posts = await _postService.GetAllPostsAsync(paginationParameters);
            if (posts.Count == 0)
            {
                return new NoContentResult();
            }
            return new OkObjectResult(posts);
        }
        [HttpGet("{id}")]
        public ActionResult GetPost([FromRoute] int id)
        {
            if (string.IsNullOrEmpty(id.ToString()))
            {
                return BadRequest();
            }
            var post = _postService.GetPost(id);
            return new OkObjectResult(post);
        }

        [HttpPost]
        public ActionResult AddPost([FromBody] PostDto post)
        {
            var addedPost = _postService.AddPost(post);
            return new OkObjectResult(addedPost);
        }

        [HttpDelete("{id}")]
        public ActionResult DeletePost([FromRoute] int id)
        {
            if (string.IsNullOrEmpty(id.ToString()))
            {
                return BadRequest();
            }
            _postService.DeletePost(id);
            return new OkResult();
        }

        [HttpPut]
        public ActionResult UpdatePost([FromBody] PostDto post)
        {
            _postService.UpdatePost(post);
            return new OkResult();
        }

        [HttpPost("upvote/{id}")]
        public ActionResult UpVote([FromRoute] int id)
        {
            var userId = (int)HttpContext.Items["UserId"];

            _postService.UpVote(userId,id);
            return new OkResult();
        }
        [HttpPost("downvote/{id}")]
        public ActionResult DownVote([FromRoute] int id)
        {
            var userId = (int)HttpContext.Items["UserId"];

            _postService.DownVote(userId,id);
            return new OkResult();
        }
    }
}
