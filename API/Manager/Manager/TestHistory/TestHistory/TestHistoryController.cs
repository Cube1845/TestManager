using Manager.Infrastructure;
using Manager.Manager.Tests.Models.DTOs.Manager;
using Manager.Manager.Tests.TestManager;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Manager.Manager.TestHistory.TestHistory
{
    [Route("api/testhistory/history")]
    [ApiController]
    public class TestHistoryController(TestHistoryService testHistoryService) : ControllerBase
    {
        private readonly TestHistoryService _testHistoryService = testHistoryService;

        [Authorize]
        [HttpGet("")]
        public async Task<IActionResult> GetTestHistory([FromQuery] string testName)
        {
            string userEmail = User.Claims.ToList()[2].Value;

            var result = await _testHistoryService.GetTestHistory(userEmail, testName);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}
