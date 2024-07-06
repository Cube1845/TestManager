using Manager.Questions.Models.DTOs.QuestionBase;
using Manager.Questions.QuestionBase;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Manager.Questions.QuestionBase
{
    [Route("[controller]")]
    [ApiController]
    public class QuestionBaseController(QuestionBaseService questionBaseService) : ControllerBase
    {
        private readonly QuestionBaseService _questionBaseService = questionBaseService;

        [Authorize]
        [HttpGet("[action]")]
        public async Task<IActionResult> GetUsersQuestionBases()
        {
            string userEmail = User.Claims.ToList()[2].Value;
            List<string> usersQuestionBasesNames;

            try
            {
                usersQuestionBasesNames = await _questionBaseService.GetUsersQuestionBasesNames(userEmail);
                return Ok(usersQuestionBasesNames);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPost("[action]")]
        public async Task<IActionResult> CreateNewQuestionBaseAndGetUsersQuestionBasesNames([FromBody] string questionBaseName)
        {
            string userEmail = User.Claims.ToList()[2].Value;

            try
            {
                await _questionBaseService.CreateNewQuestionBase(userEmail, questionBaseName);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            List<string> usersQuestionBasesNames;

            try
            {
                usersQuestionBasesNames = await _questionBaseService.GetUsersQuestionBasesNames(userEmail);
                return Ok(usersQuestionBasesNames);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("[action]")]
        public async Task<IActionResult> RemoveQuestionBaseAndGetUsersQuestionBasesNames([FromQuery] string questionBaseName)
        {
            string userEmail = User.Claims.ToList()[2].Value;

            try
            {
                await _questionBaseService.RemoveQuestionBase(userEmail, questionBaseName);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            List<string> usersQuestionBasesNames;

            try
            {
                usersQuestionBasesNames = await _questionBaseService.GetUsersQuestionBasesNames(userEmail);
                return Ok(usersQuestionBasesNames);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPut("[action]")]
        public async Task<IActionResult> UpdateQuestionBaseNameAndGetUsersQuestionBasesNames([FromBody] UpdateQuestionBaseNameDTO dto)
        {
            string userEmail = User.Claims.ToList()[2].Value;

            try
            {
                await _questionBaseService.UpdateQuestionBaseName(userEmail, dto.OldQuestionBaseName, dto.NewQuestionBaseName);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            List<string> usersQuestionBasesNames;

            try
            {
                usersQuestionBasesNames = await _questionBaseService.GetUsersQuestionBasesNames(userEmail);
                return Ok(usersQuestionBasesNames);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
