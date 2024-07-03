using Manager.Questions.Models;
using Manager.Questions.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Manager.Questions.QuestionEdit
{
    [Route("[controller]")]
    [ApiController]
    public class QuestionEditController(QuestionEditService questionEditService) : ControllerBase
    {
        private readonly QuestionEditService _questionEditService = questionEditService;

        [Authorize]
        [HttpPost("[action]")]
        public async Task<IActionResult> GetQuestionsFromQuestionBase([FromBody] QuestionBaseNameDTO dto)
        {
            string userEmail = User.Claims.ToList()[2].Value;

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
        [HttpPost("[action]")]
        public async Task<IActionResult> AddQuestionToQuestionBaseAndGetQuestions([FromBody] EditQuestionsInQuestionBaseDTO dto)
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
        [HttpPost("[action]")]
        public async Task<IActionResult> RemoveQuestionFromQuestionBaseAndGetQuestions([FromBody] EditQuestionsInQuestionBaseDTO dto)
        {
            string userEmail = User.Claims.ToList()[2].Value;

            try
            {
                await _questionEditService.RemoveQuestionFromQuestionBase(userEmail, dto.QuestionBaseName, dto.Question);
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
        [HttpPut("[action]")]
        public async Task<IActionResult> UpdateQuestionInDataBaseAndGetQuestions([FromBody] UpdateQuestionInQuestionBaseDTO dto)
        {
            string userEmail = User.Claims.ToList()[2].Value;

            try
            {
                await _questionEditService
                    .UpdateQuestionInQuestionBase(userEmail, dto.QuestionBaseName, dto.OldQuestion, dto.UpdatedQuestion);
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
