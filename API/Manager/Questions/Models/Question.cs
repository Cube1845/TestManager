using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manager.Questions.Models
{
    public record Question
    {
        public string Content = "";
        public List<string> Answers = new List<string>();
        public string CorrectAnswer = "";
    }
}
