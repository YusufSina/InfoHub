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

        Task<PagedList<Post>> GetAllPostsUserAsync(int userId, PaginationParameters paginationParameters);

        Post GetPost(int id);
        
        void UpVote(int userId,int id);
        
        void DownVote(int userId, int id);
        
        Post AddPost(PostDto post);
        
        void DeletePost(int postId);
        
        void UpdatePost(PostDto post);
    }
}
