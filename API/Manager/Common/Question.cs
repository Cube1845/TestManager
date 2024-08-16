using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manager.Common
{
    public record Question
    {
        public string Content { get; set; } = string.Empty;
        public List<Answer> Answers { get; set; } = [];
    }
}
