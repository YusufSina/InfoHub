using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InfoHub.Controllers
{
    [Route("api/[controller]")]
    public class PostsController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get()
        {
            return new OkObjectResult("TEST");
        }
    }
}
