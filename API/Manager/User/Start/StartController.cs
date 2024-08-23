using Manager.Infrastructure;
using Manager.User.Models;
using Microsoft.AspNetCore.Mvc;

namespace Manager.User.Start
{
    [Route("api/user/start")]
    [ApiController]
    public class StartController(StartService startService) : ControllerBase
    {
        private readonly StartService _startService = startService;

        [HttpGet("")]
        public async Task<IActionResult> GetQuestionSet([FromQuery] string testCode)
        {
            Result<TestData> result = await _startService.GetQuesitonSet(testCode);

            return Ok(result);
        }
    }
}
