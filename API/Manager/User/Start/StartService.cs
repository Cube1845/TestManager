using Manager.Common;
using Manager.Infrastructure;
using Manager.Manager.Tests.Models;
using Manager.Manager.Tests.TestSettingsEdit;
using Manager.Persistence;
using Manager.Persistence.Tables;
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

            IdTestSettings settings = JsonConvert.DeserializeObject<IdTestSettings>(testDb.Settings)!;

            if (settings.UsedQuestionBasesIds.Count == 0 || settings.UsedQuestionBasesIds == null)
            {
                return Result<TestData>.Error("Ten test nie ma wybranych pytań");
            }

            var questionBaseDbList = await _context.QuestionBases
                .Where(questionBase => settings.UsedQuestionBasesIds.Contains(questionBase.Id))
                .ToListAsync();

            var questionBasesIds = questionBaseDbList.Select(questionBase => questionBase.Id);

            var questionList = await _context.Questions
                .Include(x => x.Answers)
                .Where(question => questionBasesIds.Contains(question.QuestionBaseId))
                .ToListAsync();

            var answerIds = questionList
                .SelectMany(x => x.Answers)
                .Select(answer => answer.Id);

            var answerList = await _context.Answers
                .Where(answer => answerIds.Contains(answer.Id))
                .ToListAsync();

            List<ProtectedQuestion> currentQuestions = [];
            List<ProtectedQuestion> questionsToChooseFrom = [];

            foreach (var questionDb in questionBaseDbList)
            {
                var questionsDbModel = questionList.Where(question => question.QuestionBaseId == questionDb.Id);
                currentQuestions = [];

                foreach (var question in questionsDbModel)
                {
                    var answers = answerList
                        .Where(answer => answer.QuestionId == question.Id)
                        .Select(x => new IdentifiedAnswer()
                        {
                            Text = x.Text,
                            AnswerId = x.Id
                        })
                        .ToArray();

                    Random.Shared.Shuffle(answers);

                    ProtectedQuestion finalQuestion = new()
                    {
                        QuestionId = question.Id,
                        Content = question.Text,
                        Answers = answers.ToList()
                    };

                    currentQuestions.Add(finalQuestion);
                }

                questionsToChooseFrom.AddRange(currentQuestions);
            }

            List<ProtectedQuestion> finalQuestions = [];

            if (settings.QuestionCount > questionsToChooseFrom.Count)
            {
                return Result<TestData>.Error("Za mało pytań do wyboru w tym teście");
            }

            for (int i = 0; i < settings.QuestionCount; i++)
            {
                var randomIndex = Random.Shared.Next(0, questionsToChooseFrom.Count);
                finalQuestions.Add(questionsToChooseFrom[randomIndex]);
                questionsToChooseFrom.RemoveAt(randomIndex);
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
