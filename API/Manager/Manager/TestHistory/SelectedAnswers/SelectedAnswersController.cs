using Manager.Infrastructure;
using Manager.Manager.TestHistory.TestHistory;
using Manager.Manager.Tests.Models.DTOs.Manager;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Manager.Manager.TestHistory.SelectedAnswers
{
    [Route("api/testhistory/selectedanswers")]
    [ApiController]
    public class SelectedAnswersController(SelectedAnswersService selectedAnswersService) : ControllerBase
    {
        private readonly SelectedAnswersService _selectedAnswersService = selectedAnswersService;

        [Authorize]
        [HttpGet("")]
        public async Task<IActionResult> GetSelectedAnswers([FromQuery] int testHistoryId)
        {
            string userEmail = User.Claims.ToList()[2].Value;

            var result = await _selectedAnswersService.GetSelectedAnswersContent(testHistoryId);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}
