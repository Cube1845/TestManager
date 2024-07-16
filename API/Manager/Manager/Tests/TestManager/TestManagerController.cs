using Manager.Infrastructure;
using Manager.Manager.Tests.Models.DTOs.Manager;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Manager.Manager.Tests.TestManager
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

            Result<List<string>> result = await _testManagerService.GetUsersTestNames(userEmail);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [Authorize]
        [HttpPost("")]
        public async Task<IActionResult> CreateNewTestAndGetUsersTests([FromBody] string testName)
        {
            string userEmail = User.Claims.ToList()[2].Value;

            Result result = await _testManagerService.CreateNewTest(userEmail, testName);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            Result<List<string>> outputResult = await _testManagerService.GetUsersTestNames(userEmail);

            if (!outputResult.IsSuccess)
            {
                return BadRequest(outputResult);
            }

            return Ok(Result<List<string>>.Success(outputResult.Value!, result.Message));
        }

        [Authorize]
        [HttpDelete("")]
        public async Task<IActionResult> RemoveTestAndGetUsersTests([FromQuery] string testName)
        {
            string userEmail = User.Claims.ToList()[2].Value;

            Result result = await _testManagerService.RemoveTest(userEmail, testName);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            Result<List<string>> outputResult = await _testManagerService.GetUsersTestNames(userEmail);

            if (!outputResult.IsSuccess)
            {
                return BadRequest(outputResult);
            }

            return Ok(Result<List<string>>.Success(outputResult.Value!, result.Message));
        }

        [Authorize]
        [HttpPut("")]
        public async Task<IActionResult> UpdateTestNameAndGetUsersTests([FromBody] UpdateTestNameDTO dto)
        {
            string userEmail = User.Claims.ToList()[2].Value;

            Result result = await _testManagerService.UpdateTestName(userEmail, dto.OldName, dto.NewName);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            Result<List<string>> outputResult = await _testManagerService.GetUsersTestNames(userEmail);

            if (!outputResult.IsSuccess)
            {
                return BadRequest(outputResult);
            }

            return Ok(Result<List<string>>.Success(outputResult.Value!, result.Message));
        }
    }
}
