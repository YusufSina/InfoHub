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
        public async Task<List<Post>> GetAllPostsAsync(int userId, int categoryId, string option)
        {
            List<Post> posts = new List<Post>();

            var query = (from p in _context.Posts
                         join pp in _context.CategoryPosts on p.Id equals pp.PostId
                         where pp.CategoryId == categoryId
                         select new Post
                         {
                             Id = p.Id,
                             Link = p.Link,
                             Title = p.Title,
                             PointCount = _context.UserPoints.Where(up => up.PostId == p.Id).Count(),
                             User = p.User,
                             CreatedAt = p.CreatedAt,
                             CommentCount = _context.Comments.Where(c => c.PostId == p.Id).Count(),
                             Categories = (from postCategory in _context.CategoryPosts
                                           join category in _context.Categories on postCategory.CategoryId equals category.Id
                                           where postCategory.PostId == p.Id
                                           select new Category
                                           {
                                               Id = category.Id,
                                               Name = category.Name
                                           }).ToList(),
                             IsPointed = _context.UserPoints.Where(up => up.PostId == p.Id && up.UserId == userId).Any()
                         });

            if (option == "hot")
            {
                posts = await query.OrderByDescending(x => x.PointCount).Take(20).ToListAsync();
            }
            if (option == "latest")
            {
                posts = await query.OrderByDescending(x => x.CreatedAt).Take(20).ToListAsync();
            }

            return posts;
        }


        public async Task<List<Post>> GetAllPostsOfUserAsync(int userId) =>
            await _context.UserPoints
            .Where(x => x.UserId == userId)
            .Select(x => _context.Posts.Where(y => y.Id == x.PostId).FirstOrDefault())
            .Select(x => new Post
            {
                Id = x.Id,
                Link = x.Link,
                Title = x.Title,
                PointCount = _context.UserPoints.Where(up => up.PostId == x.Id).Count(),
                User = x.User,
                CreatedAt = x.CreatedAt,
                CommentCount = _context.Comments.Where(c => c.PostId == x.Id).Count(),
                Categories = (from postCategory in _context.CategoryPosts
                              join category in _context.Categories on postCategory.CategoryId equals category.Id
                              where postCategory.PostId == x.Id
                              select new Category
                              {
                                  Id = category.Id,
                                  Name = category.Name
                              }).ToList(),
                IsPointed = _context.UserPoints.Where(up => up.PostId == x.Id && up.UserId == userId).Any()

            })
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync();

        public Post GetPost(int id) =>
            _context.Posts.Where(x => x.Id == id)
             .Select(x => new Post
             {
                 Id = x.Id,
                 Link = x.Link,
                 Title = x.Title,
                 PointCount = _context.UserPoints.Where(up => up.PostId == x.Id).Count(),
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
