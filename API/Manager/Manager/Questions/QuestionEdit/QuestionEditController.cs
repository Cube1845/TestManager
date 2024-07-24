using Manager.Infrastructure;
using Manager.Manager.Questions.Models.DTOs.QuestionEdit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Manager.Manager.Questions.QuestionEdit
{
    [Route("api/questions/edit")]
    [ApiController]
    public class QuestionEditController(QuestionEditService questionEditService) : ControllerBase
    {
        private readonly QuestionEditService _questionEditService = questionEditService;

        [Authorize]
        [HttpGet("")]
        public async Task<IActionResult> GetQuestionsFromQuestionBase([FromQuery] string questionBaseName)
        {
            string userEmail = User.Claims.ToList()[2].Value;

            Result<List<Question>> result =
                await _questionEditService.GetUsersQuestionsFromQuestionBase(userEmail, questionBaseName);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [Authorize]
        [HttpPost("")]
        public async Task<IActionResult> AddQuestionToQuestionBaseAndGetQuestions([FromBody] AddQuestionToQuestionBaseDTO dto)
        {
            string userEmail = User.Claims.ToList()[2].Value;

            Result result =
                await _questionEditService.AddQuestionToQuestionBase(userEmail, dto.QuestionBaseName, dto.Question);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            Result<List<Question>> outputResult =
                await _questionEditService.GetUsersQuestionsFromQuestionBase(userEmail, dto.QuestionBaseName);

            if (!outputResult.IsSuccess)
            {
                return BadRequest(outputResult);
            }

            return Ok(Result<List<Question>>.Success(outputResult.Value!, result.Message));
        }

        [Authorize]
        [HttpDelete("")]
        public async Task<IActionResult> RemoveQuestionFromQuestionBaseAndGetQuestions([FromQuery] string questionBaseName, int questionToRemoveIndex)
        {
            string userEmail = User.Claims.ToList()[2].Value;

            Result result =
                await _questionEditService.RemoveQuestionFromQuestionBase(userEmail, questionBaseName, questionToRemoveIndex);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            Result<List<Question>> outputResult =
                await _questionEditService.GetUsersQuestionsFromQuestionBase(userEmail, questionBaseName);

            if (!outputResult.IsSuccess)
            {
                return BadRequest(outputResult);
            }

            return Ok(Result<List<Question>>.Success(outputResult.Value!, result.Message));
        }

        [Authorize]
        [HttpPut("")]
        public async Task<IActionResult> UpdateQuestionInDataBaseAndGetQuestions([FromBody] UpdateQuestionInQuestionBaseDTO dto)
        {
            string userEmail = User.Claims.ToList()[2].Value;

            Result result =
                await _questionEditService.UpdateQuestionInQuestionBase(userEmail, dto.QuestionBaseName, dto.QuestionIndex, dto.UpdatedQuestion);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            Result<List<Question>> outputResult =
                await _questionEditService.GetUsersQuestionsFromQuestionBase(userEmail, dto.QuestionBaseName);

            if (!outputResult.IsSuccess)
            {
                return BadRequest(outputResult);
            }

            return Ok(Result<List<Question>>.Success(outputResult.Value!, result.Message));
        }
    }
}
