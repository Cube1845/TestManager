using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manager.Questions.Models.DTOs
{
    public record UpdateQuestionInQuestionBaseDTO
    {
        public string QuestionBaseName = "";
        public Question OldQuestion = new Question();
        public Question UpdatedQuestion = new Question();
    }
}
