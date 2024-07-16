using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Manager.Manager.Questions.Models;

namespace Manager.Manager.Questions.Models.DTOs.QuestionEdit
{
    public record UpdateQuestionInQuestionBaseDTO
    {
        public string QuestionBaseName { get; set; } = "";
        public int QuestionIndex { get; set; }
        public Question UpdatedQuestion { get; set; } = new Question();
    }
}
