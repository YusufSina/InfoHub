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
             await _context.Posts
                    .Select(x => new Post
                    {
                        Id = x.Id,
                        Link = x.Link,
                        Title = x.Title,
                        Point = x.Point,
                        User = x.User,
                        CreatedAt = x.CreatedAt,
                        Categories = (from postCategory in _context.CategoryPosts
                                      join category in _context.Categories on postCategory.CategoryId equals category.Id
                                      where postCategory.PostId == x.Id
                                      select new Category
                                      {
                                          Id = category.Id,
                                          Name = category.Name
                                      }).ToList()
                    })
                    .OrderByDescending(x=>x.Point)
                    .Take(20)
                    .ToListAsync();

        public Post GetPost(int id) =>
            _context.Posts.Where(x => x.Id == id)
             .Select(x => new Post
             {
                 Id = x.Id,
                 Link = x.Link,
                 Title = x.Title,
                 Point = x.Point,
                 User = x.User,
                 CreatedAt = x.CreatedAt,
                 Categories = (from postCategory in _context.CategoryPosts
                               join category in _context.Categories on postCategory.CategoryId equals category.Id
                               where postCategory.PostId == x.Id
                               select new Category
                               {
                                   Id = category.Id,
                                   Name = category.Name
                               }).ToList()
             })
            .SingleOrDefault();
        
    }
}
