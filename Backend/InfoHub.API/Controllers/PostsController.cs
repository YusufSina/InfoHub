using InfoHub.API.Attributes;
using InfoHub.Core.Dtos;
using InfoHub.Core.Helpers;
using InfoHub.Core.Interfaces;
using InfoHub.Core.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
        public async Task<ActionResult> GetAllPosts([FromQuery] PaginationParameters paginationParameters, [FromQuery] int categoryId = 1, [FromQuery] string option = "hot")
        {
            var userId = (int)HttpContext.Items["UserId"];
            var posts = await _postService.GetAllPostsAsync(paginationParameters, userId,categoryId, option);

            if (posts.Count == 0)
            {
                return new NoContentResult();
            }

            var metadata = new
            {
                posts.TotalCount,
                posts.PageSize,
                posts.CurrentPage,
                posts.TotalPages,
                posts.HasNext,
                posts.HasPrevious
            };
            Response.Headers.Add("Pagination", JsonConvert.SerializeObject(metadata));

            return new OkObjectResult(posts);
        }

        [HttpGet("myPoints")]
        public async Task<ActionResult> GetAllPostsOfUser([FromQuery] PaginationParameters paginationParameters)
        {
            var userId = (int)HttpContext.Items["UserId"];

            var posts = await _postService.GetAllPostsUserAsync(userId, paginationParameters);

            if (posts.Count == 0)
            {
                return new NoContentResult();
            }

            var metadata = new
            {
                posts.TotalCount,
                posts.PageSize,
                posts.CurrentPage,
                posts.TotalPages,
                posts.HasNext,
                posts.HasPrevious
            };
            Response.Headers.Add("Pagination", JsonConvert.SerializeObject(metadata));

            return new OkObjectResult(posts);
        }

        [HttpPost]
        public ActionResult AddPost([FromBody] PostDto post)
        {
            var userId = (int)HttpContext.Items["UserId"];
            post.UserId = userId;

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

            _postService.UpVote(userId, id);
            return new OkResult();
        }
        [HttpPost("downvote/{id}")]
        public ActionResult DownVote([FromRoute] int id)
        {
            var userId = (int)HttpContext.Items["UserId"];

            _postService.DownVote(userId, id);
            return new OkResult();
        }
    }
}
