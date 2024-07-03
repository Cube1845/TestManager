using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manager.Questions.Models.DTOs
{
    public record EditQuestionsInQuestionBaseDTO
    {
        public string QuestionBaseName = "";
        public Question Question = new Question();
    }
}
