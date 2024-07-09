using Manager.Questions.Models;
using Manager.Questions.Models.DTOs.QuestionBase;
using Manager.Questions.Models.DTOs.QuestionEdit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Manager.Questions.QuestionEdit
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

            try
            {
                List<Question> questions = 
                    await _questionEditService.GetUsersQuestionsFromQuestionBase(userEmail, questionBaseName);
                return Ok(questions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPost("")]
        public async Task<IActionResult> AddQuestionToQuestionBaseAndGetQuestions([FromBody] AddQuestionToQuestionBaseDTO dto)
        {
            string userEmail = User.Claims.ToList()[2].Value;

            try
            {
                await _questionEditService.AddQuestionToQuestionBase(userEmail, dto.QuestionBaseName, dto.Question);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            try
            {
                List<Question> questions =
                    await _questionEditService.GetUsersQuestionsFromQuestionBase(userEmail, dto.QuestionBaseName);
                return Ok(questions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("")]
        public async Task<IActionResult> RemoveQuestionFromQuestionBaseAndGetQuestions([FromQuery] string questionBaseName, int questionToRemoveIndex)
        {
            string userEmail = User.Claims.ToList()[2].Value;

            try
            {
                await _questionEditService.RemoveQuestionFromQuestionBase(userEmail, questionBaseName, questionToRemoveIndex);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            try
            {
                List<Question> questions =
                    await _questionEditService.GetUsersQuestionsFromQuestionBase(userEmail, questionBaseName);
                return Ok(questions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPut("")]
        public async Task<IActionResult> UpdateQuestionInDataBaseAndGetQuestions([FromBody] UpdateQuestionInQuestionBaseDTO dto)
        {
            string userEmail = User.Claims.ToList()[2].Value;

            try
            {
                await _questionEditService
                    .UpdateQuestionInQuestionBase(userEmail, dto.QuestionBaseName, dto.QuestionIndex, dto.UpdatedQuestion);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            try
            {
                List<Question> questions =
                    await _questionEditService.GetUsersQuestionsFromQuestionBase(userEmail, dto.QuestionBaseName);
                return Ok(questions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
