using Manager.Questions.Models;
using Manager.Questions.Models.DTOs.QuestionBase;
using Manager.Questions.Models.DTOs.QuestionEdit;
using Manager.Tests.Models.DTOs.Manager;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Manager.Tests.TestManager
{
    [Route("api/tests/manager")]
    [ApiController]
    public class TestManagerEditController(TestManagerService testManagerService) : ControllerBase
    {
        private readonly TestManagerService _testManagerService = testManagerService;

        [Authorize]
        [HttpGet("")]
        public async Task<IActionResult> GetUsersTests()
        {
            string userEmail = User.Claims.ToList()[2].Value;

            try
            {
                List<string> tests = 
                    await _testManagerService.GetUsersTestNames(userEmail);
                return Ok(tests);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPost("")]
        public async Task<IActionResult> CreateNewTestAndGetUsersTests([FromBody] string testName)
        {
            string userEmail = User.Claims.ToList()[2].Value;

            try
            {
                await _testManagerService.CreateNewTest(userEmail, testName);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            try
            {
                List<string> tests =
                    await _testManagerService.GetUsersTestNames(userEmail);
                return Ok(tests);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("")]
        public async Task<IActionResult> RemoveTestAndGetUsersTests([FromQuery] string testName)
        {
            string userEmail = User.Claims.ToList()[2].Value;

            try
            {
                await _testManagerService.RemoveTest(userEmail, testName);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            try
            {
                List<string> tests =
                    await _testManagerService.GetUsersTestNames(userEmail);
                return Ok(tests);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPut("")]
        public async Task<IActionResult> UpdateTestNametAndGetUsersTests([FromBody] UpdateTestNameDTO dto)
        {
            string userEmail = User.Claims.ToList()[2].Value;

            try
            {
                await _testManagerService.UpdateTestName(userEmail, dto.OldName, dto.NewName);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            try
            {
                List<string> tests =
                    await _testManagerService.GetUsersTestNames(userEmail);
                return Ok(tests);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
