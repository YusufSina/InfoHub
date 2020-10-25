using AutoMapper;
using InfoHub.Core.Dto;
using InfoHub.Core.Dtos;
using InfoHub.Core.Models;

namespace InfoHub.API.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<RequestSignUpDto, User>();
            CreateMap<RequestAuthDto, User>();
            CreateMap<User, ResponseAuthDto>();
            CreateMap<Post, PostDto>();
            CreateMap<PostDto, Post>();
        }
    }
}
