using Manager.Infrastructure;
using Manager.Questions.Models.DTOs.QuestionBase;
using Manager.Questions.QuestionBase;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Manager.Questions.QuestionBase
{
    [Route("api/questions/base")]
    [ApiController]
    public class QuestionBaseController(QuestionBaseService questionBaseService) : ControllerBase
    {
        private readonly QuestionBaseService _questionBaseService = questionBaseService;

        [Authorize]
        [HttpGet("")]
        public async Task<IActionResult> GetUsersQuestionBases()
        {
            string userEmail = User.Claims.ToList()[2].Value;

            Result<List<string>> result = await _questionBaseService.GetUsersQuestionBasesNames(userEmail);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [Authorize]
        [HttpPost("")]
        public async Task<IActionResult> CreateNewQuestionBaseAndGetUsersQuestionBasesNames([FromBody] string questionBaseName)
        {
            string userEmail = User.Claims.ToList()[2].Value;

            Result result = await _questionBaseService.CreateNewQuestionBase(userEmail, questionBaseName);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            Result<List<string>> outputResult = await _questionBaseService.GetUsersQuestionBasesNames(userEmail);

            if (!outputResult.IsSuccess)
            {
                return BadRequest(outputResult);
            }

            return Ok(Result<List<string>>.Success(outputResult.Value!, result.Message));
        }

        [Authorize]
        [HttpDelete("")]
        public async Task<IActionResult> RemoveQuestionBaseAndGetUsersQuestionBasesNames([FromQuery] string questionBaseName)
        {
            string userEmail = User.Claims.ToList()[2].Value;

            Result result = await _questionBaseService.RemoveQuestionBase(userEmail, questionBaseName); ;

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            Result<List<string>> outputResult = await _questionBaseService.GetUsersQuestionBasesNames(userEmail);

            if (!outputResult.IsSuccess)
            {
                return BadRequest(outputResult);
            }

            return Ok(Result<List<string>>.Success(outputResult.Value!, result.Message));
        }

        [Authorize]
        [HttpPut("")]
        public async Task<IActionResult> UpdateQuestionBaseNameAndGetUsersQuestionBasesNames([FromBody] UpdateQuestionBaseNameDTO dto)
        {
            string userEmail = User.Claims.ToList()[2].Value;

            Result result = 
                await _questionBaseService.UpdateQuestionBaseName(userEmail, dto.OldQuestionBaseName, dto.NewQuestionBaseName);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            Result<List<string>> outputResult = await _questionBaseService.GetUsersQuestionBasesNames(userEmail);

            if (!outputResult.IsSuccess)
            {
                return BadRequest(outputResult);
            }

            return Ok(Result<List<string>>.Success(outputResult.Value!, result.Message));
        }
    }
}
