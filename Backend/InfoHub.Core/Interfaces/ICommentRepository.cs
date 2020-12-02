using InfoHub.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InfoHub.Core.Interfaces
{
    public interface ICommentRepository : IRepository<Comment>
    {
        Comment GetComment(int id);

        Task<List<Comment>> GetAllCommentsByPostIdAsync(int postId);
    }
}
