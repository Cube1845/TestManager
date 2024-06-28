using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TestManager
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpGet("[action]"), Authorize]
        public IActionResult IsUserAuthorized()
        {
            return Ok(true);
        }
    }
}
