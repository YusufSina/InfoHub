using InfoHub.Core.Interfaces;
using InfoHub.Core.Models;
using InfoHub.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InfoHub.Infrastructure.Repositories
{
    public class PostRepository : Repository<Post>, IPostRepository
    {
        private readonly InfoHubContext _context;

        public PostRepository(InfoHubContext context) : base(context)
        {
            _context = context;
        }
        public async Task<List<Post>> GetAllPostsAsync() =>
             await _context.Posts.Include(x => x.User)
                    .OrderByDescending(x=>x.Point)
                    .Take(20).ToListAsync();

        public Post GetPost(int id) =>
            _context.Posts.Include(x => x.User).Where(x => x.Id == id).SingleOrDefault();
        
    }
}
