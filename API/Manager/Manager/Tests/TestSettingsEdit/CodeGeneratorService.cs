using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manager.Manager.Tests.TestSettingsEdit
{
    public class CodeGeneratorService
    {
        private readonly string upperCaseCharRow = "ABCDEFGHIJKLMNOPQRSTUWXYZ";
        private readonly string lowerCaseCharRow = "abcdefghijklmnopqrstuwxyz";
        private readonly string numberRow = "0123456789";

        public string GenerateCode(int codeSize)
        {
            var chars = GetChars();
            Random random = new Random();
            string code = string.Empty;

            for (int i = 0; i < codeSize; i++)
            {
                code += chars[random.Next(0, chars.Count)];
            }

            return code;
        }

        private List<char> GetChars()
        {
            List<char> chars = new List<char>();

            foreach(char c in upperCaseCharRow)
            {
                chars.Add(c);
            }

            foreach (char c in lowerCaseCharRow)
            {
                chars.Add(c);
            }

            foreach (char c in numberRow)
            {
                chars.Add(c);
            }

            return chars;
        }
    }
}
