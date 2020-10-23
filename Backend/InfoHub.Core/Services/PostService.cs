using InfoHub.Core.Interfaces;
using InfoHub.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace InfoHub.Core.Services
{
    public class PostService : IPostService
    {
        private readonly IRepository<Post> _postRepository;

        public PostService(IRepository<Post> postRepository)
        {
            _postRepository = postRepository;
        }
        public async Task<List<Post>> GetAllPostsAsync()
        {
            return await _postRepository.GetAllAsync();
        }
    }
}
