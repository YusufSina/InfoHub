using System;
using System.Collections.Generic;
using System.Linq;
using InfoHub.Core.Dto;
using InfoHub.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace InfoHub.API.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _accountService;
        public AuthController(IAuthService accountService)
        {
            _accountService = accountService;
        }
        [HttpPost("signup")]
        public ActionResult SignUp([FromBody] RequestSignUpDto requestSignUpDto)
        {
            var user = _accountService.SignUp(requestSignUpDto);
            if (user == null)
            {
                return new BadRequestResult();
            }

            return new OkObjectResult(user);
        }

        [HttpPost("login")]
        public ActionResult Login([FromBody] RequestAuthDto requestAuthDto)
        {
            var user =  _accountService.Login(requestAuthDto);
            if (user == null)
            {
                return new BadRequestResult();
            }
            return new OkObjectResult(user);
        }
    }
}
