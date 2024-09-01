using Manager.Common;
using Manager.Infrastructure;
using Manager.Manager.Tests.Models;
using Manager.Manager.Tests.Models.DTOs.SettingsEdit;
using Manager.User.Finish;
using Manager.User.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Manager.Manager.Tests.TestSettingsEdit
{
    [Route("api/user/finish")]
    [ApiController]
    public class FinishController(FinishService finishService) : ControllerBase
    {
        private readonly FinishService _finishService = finishService;

        [HttpPost]
        public async Task<IActionResult> FinishTest(FinishTestDTO dto)
        {
            var score = await _finishService.FinishTest(dto);

            return Ok(Result<Score>.Success(score));
        } 
    }
}
