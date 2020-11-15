using InfoHub.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace InfoHub.Core.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}
