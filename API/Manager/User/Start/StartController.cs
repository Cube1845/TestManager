using Manager.Infrastructure;
using Manager.Manager.Tests.Models.DTOs.Manager;
using Manager.Manager.Tests.Models.DTOs.SettingsEdit;
using Manager.Manager.Tests.TestSettingsEdit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
            Result<List<Question>> result = await _startService.GetQuesitonSet(testCode);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}
