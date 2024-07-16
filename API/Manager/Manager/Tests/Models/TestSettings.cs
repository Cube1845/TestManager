using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manager.Manager.Tests.Models
{
    public class TestSettings
    {
        public List<string> UsedQuestionBases { get; set; } = new List<string>();
        public int QuestionCount { get; set; } = 10;
    }
}
