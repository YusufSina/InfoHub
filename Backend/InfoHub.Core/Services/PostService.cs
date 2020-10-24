using InfoHub.Core.Dtos;
using InfoHub.Core.Helpers;
using InfoHub.Core.Interfaces;
using InfoHub.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;

namespace InfoHub.Core.Services
{
    public class PostService : IPostService
    {
        private readonly IPostRepository _postRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public PostService(IPostRepository postRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _postRepository = postRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<PagedList<Post>> GetAllPostsAsync(PaginationParameters paginationParameters)
        {
            var posts = await _postRepository.GetAllPostsAsync();
            return PagedList<Post>.ToPagedList(posts.AsQueryable(), paginationParameters.PageNumber, paginationParameters.PageSize);
        }
        public Post GetPost(int id)
        {
            var post = _postRepository.GetPost(id);
            return post;
        }
        public Post AddPost(PostDto post)
        {
            var postMap = _mapper.Map<Post>(post);
            _postRepository.Add(postMap);
            _unitOfWork.Complete();
            return postMap;
        }

        public void DeletePost(int postId)
        {
            var post = _postRepository.Get(x => x.Id == postId);
            _postRepository.Delete(post);
            _unitOfWork.Complete();
        }
        public void UpdatePost(PostDto post)
        {
            var postMap = _mapper.Map<Post>(post);
            _postRepository.Update(postMap);
            _unitOfWork.Complete();
        }
        public void UpVote(int id)
        {
            throw new NotImplementedException();
        }
        public void DownVote(int id)
        {
            throw new NotImplementedException();
        }
    }
}
