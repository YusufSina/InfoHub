using InfoHub.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InfoHub.Core.Interfaces
{
    public interface ICommentRepository : IRepository<Comment>
    {
        Task<List<Comment>> GetAllCommentsByPostIdAsync(int postId);
    }
}
