using InfoHub.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace InfoHub.Core.Interfaces
{
    public interface IPostRepository : IRepository<Post>
    {
        Task<List<Post>> GetAllPostsAsync(int userId, int categoryId, string option);

        Task<List<Post>> GetAllPostsOfUserAsync(int userId);
        Post GetPost(int id);
    }
}
