using Manager.Infrastructure;
using Manager.Manager.Tests.Models;
using Manager.Manager.Tests.TestSettingsEdit;
using Manager.Persistence;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manager.User.Start
{
    public class StartService(ManagerDbContext dbContext)
    {
        private readonly ManagerDbContext _context = dbContext;

        public async Task<Result<List<Question>>> GetQuesitonSet(string testCode)
        {
            var testDb = await _context.Tests.FirstOrDefaultAsync(test => test.Code == testCode);

            if (testDb == null)
            {
                return Result<List<Question>>.Error("Taki test nie istnieje");
            }

            TestSettings settings = JsonConvert.DeserializeObject<TestSettings>(testDb.Settings)!;

            if (settings.UsedQuestionBases.Count < 1 || settings.UsedQuestionBases == null)
            {
                return Result<List<Question>>.Error("Ten test nie ma wybranych pytań");
            }

            List<Question> currentQuestions = new List<Question>();
            List<Question> questionsToChooseFrom = new List<Question>();

            Persistence.Tables.QuestionBases? questionDb;

            foreach (string questionBaseName in settings.UsedQuestionBases)
            {
                questionDb = await _context.QuestionBases.FirstOrDefaultAsync(
                    questionBase => questionBase.Name == questionBaseName &&
                    questionBase.OwnerEmail == testDb.OwnerEmail
                );

                if (questionDb == null)
                {
                    return Result<List<Question>>.Error("Ten test korzysta z nie istniejącej bazy pytań");
                }

                currentQuestions = JsonConvert.DeserializeObject<List<Question>>(questionDb.Questions)!;

                foreach (Question question in currentQuestions)
                {
                    questionsToChooseFrom.Add(question);
                }
            }

            List<Question> finalQuestions = new List<Question>();

            if (settings.QuestionCount > questionsToChooseFrom.Count)
            {
                return Result<List<Question>>.Error("Za mało pytań do wyboru w tym teście");
            }

            Random random = new Random();
            List<int> disqualifiedIterations = new List<int>();
            int iteration;

            for (int i = 0; i < settings.QuestionCount; i++)
            {
                do
                {
                    iteration = random.Next(0, questionsToChooseFrom.Count);
                }
                while (disqualifiedIterations.Contains(iteration)); 

                finalQuestions.Add(questionsToChooseFrom[iteration]);
                disqualifiedIterations.Add(iteration);
            }

            return Result<List<Question>>.Success(finalQuestions);
        }
    }
}
