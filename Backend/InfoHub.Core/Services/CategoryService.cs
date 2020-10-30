using InfoHub.Core.Interfaces;
using InfoHub.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace InfoHub.Core.Services
{
    public class CategoryService : ICategoryService
    {
        public IRepository<Category> _categoryRepository { get; set; }
        public CategoryService(IRepository<Category> categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<List<Category>> GetCategories() => await _categoryRepository.GetAllAsync();
        public Category GetCategory() => _categoryRepository.Get(x => x.Id == 1);

    }
}
