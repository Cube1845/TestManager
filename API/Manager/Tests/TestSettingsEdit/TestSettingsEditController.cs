using Manager.Questions.Models;
using Manager.Questions.Models.DTOs.QuestionBase;
using Manager.Questions.Models.DTOs.QuestionEdit;
using Manager.Tests.Models;
using Manager.Tests.Models.DTOs;
using Manager.Tests.Models.DTOs.SettingsEdit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Manager.Tests.TestSettingsEdit
{
    [Route("api/tests/settings")]
    [ApiController]
    public class TestSettingsEditController(TestSettingsEditService testSettingsEditService) : ControllerBase
    {
        private readonly TestSettingsEditService _testSettingsEditService = testSettingsEditService;

        [Authorize]
        [HttpGet("")]
        public async Task<IActionResult> GetUsersTests([FromQuery] string testName)
        {
            string userEmail = User.Claims.ToList()[2].Value;

            try
            {
                TestSettings settings =
                    await _testSettingsEditService.GetTestsSettings(userEmail, testName);
                return Ok(settings);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPut("")]
        public async Task<IActionResult> UpdateTestNametAndGetUsersTests([FromBody] UpdateTestSettingsDTO dto)
        {
            string userEmail = User.Claims.ToList()[2].Value;

            try
            {
                await _testSettingsEditService.UpdateTestSettings(userEmail, dto.Name, dto.Settings);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            try
            {
                TestSettings settings =
                    await _testSettingsEditService.GetTestsSettings(userEmail, dto.Name);
                return Ok(settings);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
