using AutoMapper;
using InfoHub.Core.Dtos;
using InfoHub.Core.Models;

namespace InfoHub.API.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Post, PostDto>();
            CreateMap<PostDto, Post>();
        }
    }
}
