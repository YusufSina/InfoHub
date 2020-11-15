using InfoHub.Core.Dtos;
using InfoHub.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InfoHub.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> AddUser(int id)
        {
            var result = await _userService.Get(id);
            return new OkObjectResult(result);
        }

        [HttpPost]
        public IActionResult AddUser(AddUserDto userDto)
        {
            var result = _userService.AddUser(userDto);
            return new OkObjectResult(result);
        }

        [HttpPost("checkEmail")]
        public IActionResult CheckEMail(string email)
        {
            var result = _userService.CheckEmail(email);

            if (result == null)
            { 
                return new OkObjectResult(false);
            }
            else
            {
                return new OkObjectResult(result);
            }

        }

    }
}
