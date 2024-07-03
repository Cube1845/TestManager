using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manager.Questions.Models.DTOs
{
    public record UpdateQuestionBaseNameDTO
    {
        public string OldQuestionBaseName { get; set; } = "";
        public string NewQuestionBaseName { get; set; } = "";
    }
}
