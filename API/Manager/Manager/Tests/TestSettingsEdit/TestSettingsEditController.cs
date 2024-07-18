using Manager.Infrastructure;
using Manager.Manager.Tests.Models;
using Manager.Manager.Tests.Models.DTOs.SettingsEdit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Manager.Manager.Tests.TestSettingsEdit
{
    [Route("api/tests/settings")]
    [ApiController]
    public class TestSettingsEditController(TestSettingsEditService testSettingsEditService) : ControllerBase
    {
        private readonly TestSettingsEditService _testSettingsEditService = testSettingsEditService;

        [Authorize]
        [HttpGet("edit")]
        public async Task<IActionResult> GetTestSettings([FromQuery] string testName)
        {
            string userEmail = User.Claims.ToList()[2].Value;

            Result<TestSettings> result = await _testSettingsEditService.GetTestsSettings(userEmail, testName);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [Authorize]
        [HttpPut("edit")]
        public async Task<IActionResult> UpdateTestSettingsAndGetSettings([FromBody] UpdateTestSettingsDTO dto)
        {
            string userEmail = User.Claims.ToList()[2].Value;

            Result result = await _testSettingsEditService.UpdateTestSettings(userEmail, dto.Name, dto.Settings);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [Authorize]
        [HttpGet("code")]
        public async Task<IActionResult> GetTestCode([FromQuery] string testName)
        {
            string userEmail = User.Claims.ToList()[2].Value;

            Result result = await _testSettingsEditService.GetTestCode(userEmail, testName);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [Authorize]
        [HttpPost("code")]
        public async Task<IActionResult> GenerateNewTestCodeAndGetCode([FromBody] string testName)
        {
            string userEmail = User.Claims.ToList()[2].Value;

            Result result = await _testSettingsEditService.GenerateNewTestCode(userEmail, testName);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            Result<string> outputResult = await _testSettingsEditService.GetTestCode(userEmail, testName);

            if (!outputResult.IsSuccess)
            {
                return BadRequest(outputResult);
            }

            return Ok(Result<string>.Success(outputResult.Value!, result.Message));
        }
    }
}
