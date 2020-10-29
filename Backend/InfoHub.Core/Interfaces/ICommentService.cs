using InfoHub.Core.Dtos;
using InfoHub.Core.Helpers;
using InfoHub.Core.Models;
using System.Threading.Tasks;

namespace InfoHub.Core.Interfaces
{
    public interface ICommentService
    {
        Task<PagedList<Comment>> GetAllCommentsByPostIdAsync(int postId,PaginationParameters paginationParameters);
        Comment AddComment(CommentDto comment);
        void DeleteComment(int commentId);
        void UpdateComment(CommentDto comment);
    }
}
