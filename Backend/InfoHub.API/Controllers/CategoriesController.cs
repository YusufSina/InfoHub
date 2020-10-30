using System.Threading.Tasks;
using InfoHub.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace InfoHub.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        public ICategoryService _categoryService { get; set; }
        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }
        [HttpGet("{id}")]
        public ActionResult GetCategory([FromRoute] int id)
        {
            var categories =  _categoryService.GetCategory();
            return new OkObjectResult(categories);
        }
        [HttpGet]
        public async Task<ActionResult> GetAllCategories()
        {
            var categories = await _categoryService.GetCategories();
            if (categories.Count == 0)
            {
                return new NoContentResult();
            }
            return new OkObjectResult(categories);
        }
    }
}
