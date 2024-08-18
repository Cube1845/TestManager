using Manager.Common;
using Manager.Infrastructure;
using Manager.Manager.Tests.Models.DTOs.Manager;
using Manager.Manager.Tests.Models.DTOs.SettingsEdit;
using Manager.Manager.Tests.TestSettingsEdit;
using Manager.User.Models;
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
            Result<List<ProtectedQuestion>> result = await _startService.GetQuesitonSet(testCode);

            return Ok(result);
        }
    }
}
