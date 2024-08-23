using Manager.Common;
using Manager.Infrastructure;
using Manager.Manager.Tests.Models;
using Manager.Manager.Tests.TestSettingsEdit;
using Manager.Persistence;
using Manager.User.Models;
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

        public async Task<Result<TestData>> GetQuesitonSet(string testCode)
        {
            var testDb = await _context.Tests.FirstOrDefaultAsync(test => test.Code == testCode);

            if (testDb == null)
            {
                return Result<TestData>.Error("Taki test nie istnieje");
            }

            TestSettings settings = JsonConvert.DeserializeObject<TestSettings>(testDb.Settings)!;

            if (settings.UsedQuestionBases.Count < 1 || settings.UsedQuestionBases == null)
            {
                return Result<TestData>.Error("Ten test nie ma wybranych pytań");
            }

            List<ProtectedQuestion> currentQuestions = [];
            List<ProtectedQuestion> questionsToChooseFrom = [];

            Persistence.Tables.QuestionBase? questionDb;

            var allQuestionList = await _context.Questions.ToListAsync();
            var allAnswerList = await _context.Answers.ToListAsync();

            var allQuestionDbList = await _context.QuestionBases.ToListAsync();

            foreach (string questionBaseName in settings.UsedQuestionBases)
            {
                questionDb = allQuestionDbList.First(
                    questionBase => questionBase.Name == questionBaseName &&
                    questionBase.OwnerEmail == testDb.OwnerEmail
                );

                if (questionDb == null)
                {
                    return Result<TestData>.Error("Ten test korzysta z nie istniejącej bazy pytań");
                }

                var questionsDbModel = allQuestionList.Where(question => question.QuestionBaseId == questionDb.Id);

                foreach (var question in questionsDbModel)
                {
                    ProtectedQuestion finalQuestion = new()
                    {
                        QuestionId = question.Id,
                        Content = question.Text,
                        Answers = []
                    };

                    var answersToCurrentQuestion = allAnswerList.Where(answer => answer.QuestionId == question.Id).ToList();

                    foreach (var answer in answersToCurrentQuestion)
                    {
                        finalQuestion.Answers.Add(new IdentifiedAnswer()
                        {
                            Text = answer.Text,
                            AnswerId = answer.Id
                        });
                    }

                    var answersArray = finalQuestion.Answers.ToArray();
                    Random.Shared.Shuffle(answersArray);
                    finalQuestion.Answers = answersArray.ToList();

                    currentQuestions.Add(finalQuestion);
                }

                foreach (ProtectedQuestion question in currentQuestions)
                {
                    questionsToChooseFrom.Add(question);
                }
            }

            List<ProtectedQuestion> finalQuestions = [];

            if (settings.QuestionCount > questionsToChooseFrom.Count)
            {
                return Result<TestData>.Error("Za mało pytań do wyboru w tym teście");
            }

            List<int> disqualifiedIterations = [];
            int iteration;

            for (int i = 0; i < settings.QuestionCount; i++)
            {
                do
                {
                    iteration = Random.Shared.Next(0, questionsToChooseFrom.Count);
                }
                while (disqualifiedIterations.Contains(iteration)); 

                finalQuestions.Add(questionsToChooseFrom[iteration]);
                disqualifiedIterations.Add(iteration);
            }

            TestData testData = new()
            {
                Questions = finalQuestions,
                TestId = testDb.Id
            };

            return Result<TestData>.Success(testData);
        }
    }
}
