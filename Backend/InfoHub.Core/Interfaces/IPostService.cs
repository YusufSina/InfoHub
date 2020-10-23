using InfoHub.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace InfoHub.Core.Interfaces
{
    public interface IPostService
    {
        Task<List<Post>> GetAllPostsAsync();
    }
}
