using InfoHub.Core.Interfaces;
using InfoHub.Core.Models;
using InfoHub.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace InfoHub.Infrastructure.Repositories
{
    public class CommentRepository : Repository<Comment>, ICommentRepository
    {
        private readonly InfoHubContext _context;

        public CommentRepository(InfoHubContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<Comment>> GetAllCommentsByPostIdAsync(int postId) =>
             await _context.Comments
                    .Where(x => x.PostId == postId && x.CommentId == -1)
                    .Select(x => new Comment
                    {
                        Id = x.Id,
                        Content = x.Content,
                        PostId = x.Id,
                        CreatedAt = x.CreatedAt,
                        User = x.User,
                        Relies = _context.Comments.Where(c => c.CommentId == x.Id).ToList()
                    })
                    .OrderByDescending(x=>x.CreatedAt)
                    .ToListAsync();


    }
}
