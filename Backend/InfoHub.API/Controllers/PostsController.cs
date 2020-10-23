using InfoHub.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InfoHub.API.Controllers
{
    [Route("api/[controller]")]
    public class PostsController : ControllerBase
    {
        private readonly IPostService _postService;

        public PostsController(IPostService postService)
        {
            _postService = postService;
        }
        [HttpGet]
        public async Task<ActionResult> GetAllPosts()
        {
            return new OkObjectResult(await _postService.GetAllPostsAsync());
        }

    }
}
