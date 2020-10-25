using InfoHub.Core.Dto;
using InfoHub.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace InfoHub.Core.Interfaces
{
    public interface IAuthService
    {
        ResponseAuthDto Login(RequestAuthDto user);
        ResponseAuthDto SignUp(RequestSignUpDto user);
        User CheckUsernameExistsAsync(string username);

    }
}
