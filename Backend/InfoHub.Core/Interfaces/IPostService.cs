using InfoHub.Core.Dtos;
using InfoHub.Core.Helpers;
using InfoHub.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace InfoHub.Core.Interfaces
{
    public interface IPostService
    {
        Task<PagedList<Post>> GetAllPostsAsync(PaginationParameters paginationParameters);
        Post GetPost(int id);
        void UpVote(int id);
        void DownVote(int id);
        Post AddPost(PostDto post);
        void DeletePost(int postId);
        void UpdatePost(PostDto post);
    }
}
