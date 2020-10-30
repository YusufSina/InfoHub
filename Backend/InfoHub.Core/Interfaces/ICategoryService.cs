using InfoHub.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InfoHub.Core.Interfaces
{
    public interface ICategoryService
    {
        Task<List<Category>> GetCategories();
        Category GetCategory();
    }
}
