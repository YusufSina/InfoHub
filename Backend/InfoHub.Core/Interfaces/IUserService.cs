using InfoHub.Core.Dtos;
using InfoHub.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace InfoHub.Core.Interfaces
{
    public interface IUserService
    {
        Task<User> Get(int user);

        AddUserResponseDto AddUser(AddUserDto user);

        AddUserResponseDto CheckEmail(string email);
    }
}
