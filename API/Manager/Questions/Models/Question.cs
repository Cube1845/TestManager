using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manager.Questions.Models
{
    public record Question
    {
        public string Content { get; set; } = "";
        public List<string> Answers { get; set; } = new List<string>();
        public string CorrectAnswer { get; set; } = "";
    }
}
