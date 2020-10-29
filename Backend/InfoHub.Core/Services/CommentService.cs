using AutoMapper;
using InfoHub.Core.Dtos;
using InfoHub.Core.Helpers;
using InfoHub.Core.Interfaces;
using InfoHub.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InfoHub.Core.Services
{
    public class CommentService : ICommentService
    {
        public ICommentRepository _commentRepository { get; set; }
        public IMapper _mapper{ get; set; }
        public IUnitOfWork _unitOfWork { get; set; }

        public CommentService(ICommentRepository commentRepository, IMapper mapper, IUnitOfWork unitOfWork)
        {
            _commentRepository = commentRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public async Task<PagedList<Comment>> GetAllCommentsByPostIdAsync(int postId, PaginationParameters paginationParameters)
        {
            var comments = await _commentRepository.GetAllCommentsByPostIdAsync(postId);
            return PagedList<Comment>.ToPagedList(comments.AsQueryable(), paginationParameters.PageNumber, paginationParameters.PageSize);
        }
        public Comment AddComment(CommentDto comment)
        {
            var commentMap = _mapper.Map<Comment>(comment);
            _commentRepository.Add(commentMap);
            _unitOfWork.Complete();
            return commentMap;
        }
        public void DeleteComment(int commentId)
        {
            var comment = _commentRepository.Get(x => x.Id == commentId);
            _commentRepository.Delete(comment);
            _unitOfWork.Complete();
        }
        public void UpdateComment(CommentDto comment)
        {
            var commentMap = _mapper.Map<Comment>(comment);
            _commentRepository.Update(commentMap);
            _unitOfWork.Complete();
        }
    }
}
