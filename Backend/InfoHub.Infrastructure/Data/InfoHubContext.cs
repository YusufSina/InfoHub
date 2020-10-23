using InfoHub.Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace InfoHub.Infrastructure.Data
{
    public class InfoHubContext : DbContext
    {
        public InfoHubContext(DbContextOptions<InfoHubContext> context) : base(context)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<CategoryPost> CategoryPosts { get; set; }
    }
}
