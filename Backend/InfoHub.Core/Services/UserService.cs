using AutoMapper;
using InfoHub.Core.Dtos;
using InfoHub.Core.Interfaces;
using InfoHub.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace InfoHub.Core.Services
{
    public class UserService : IUserService
    {
        private readonly IRepository<User> _userRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;

        public UserService(IRepository<User> userRepository, IUnitOfWork unitOfWork, IMapper mapper, ITokenService tokenService)
        {
            _userRepository = userRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _tokenService = tokenService;
        }

        public AddUserResponseDto AddUser(AddUserDto userDto)
        {
            var user = _mapper.Map<User>(userDto);
            _userRepository.Add(user);
            _unitOfWork.Complete();

            var token = _tokenService.CreateToken(user);
            var responseUser = _mapper.Map<AddUserResponseDto>(user);
            responseUser.Token = token;

            return responseUser;
        }

        public AddUserResponseDto CheckEmail(string email)
        {
            var checkEmail = _userRepository.Get(x => x.Email == email);

            if (checkEmail != null)
            {
                var token = _tokenService.CreateToken(checkEmail);
                var response = _mapper.Map<AddUserResponseDto>(checkEmail);
                response.Token = token;
                return response;
            }

            return null;
        }

        public async Task<User> Get(int id)
        {
            return await _userRepository.GetByIdAsync(id);
        }
    }
}
