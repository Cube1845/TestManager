using Manager.Common;
using Manager.Infrastructure;
using Manager.Persistence;
using Manager.Persistence.Tables;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Manager.Manager.Questions.QuestionEdit;

public class QuestionEditService(ManagerDbContext context)
{
    private readonly ManagerDbContext _context = context;

    public async Task<Result<List<Common.Question>>> GetUsersQuestionsFromQuestionBase(string ownerEmail, string questionBaseName)
    {
        var questionBaseDb = await _context.QuestionBases.FirstOrDefaultAsync(questionBase =>
            questionBase.Name == questionBaseName && questionBase.OwnerEmail == ownerEmail
        );

        if (questionBaseDb == null)
        {
            return Result<List<Common.Question>>.Error("Ta baza pytań nie istnieje");
        }


        var allQuestionList = await _context.Questions.ToListAsync();
        var baseQuestionList = allQuestionList.Where(question => question.QuestionBaseId == questionBaseDb.Id).ToList();

        List<Common.Question> questionList = [];

        var allAnswerList = await _context.Answers.ToListAsync();
        List<Common.Answer> answers;
        List<Persistence.Tables.Answer> answersToCurrentQuestion;

        foreach (var question in baseQuestionList)
        {
            answersToCurrentQuestion = allAnswerList.Where(answer => answer.QuestionId == question.Id).ToList();

            answers = [];

            foreach (var answer in answersToCurrentQuestion)
            {
                answers.Add(new Common.Answer()
                {
                    Text = answer.Text,
                    IsCorrect = answer.IsCorrect
                });
            }

            questionList.Add(
                new Common.Question()
                {
                    Content = question.Text,
                    Answers = answers
                }
            );
        }

        return Result<List<Common.Question>>.Success(questionList);
    }

    public async Task<Result> AddQuestionToQuestionBase(string ownerEmail, string questionBaseName, Common.Question questionToAdd)
    {
        var questionBaseDb = await _context.QuestionBases.FirstOrDefaultAsync(questionBase =>
            questionBase.Name == questionBaseName && questionBase.OwnerEmail == ownerEmail
        );

        if (questionBaseDb == null)
        {
            return Result.Error("Ta baza pytań nie istnieje");
        }

        var question = new Persistence.Tables.Question()
        {
            QuestionBaseId = questionBaseDb.Id,
            Text = questionToAdd.Content,
            QuestionBase = questionBaseDb,
        };

        await _context.Questions.AddAsync(question);
        await _context.SaveChangesAsync();

        foreach (var answer in questionToAdd.Answers)
        {
            Persistence.Tables.Answer answerModel = new()
            {
                Text = answer.Text,
                QuestionId = question.Id,
                IsCorrect = answer.IsCorrect,
                Question = question
            };

            await _context.Answers.AddAsync(answerModel);
            question.Answers.Add(answerModel);
        }

        questionBaseDb.Questions.Add(question);
        
        await _context.SaveChangesAsync();
        return Result.Success("Dodano pytanie");
    }

    public async Task<Result> UpdateQuestionInQuestionBase(string ownerEmail, string questionBaseName, int questionIndex, Common.Question updatedQuestion)
    {
        var questionBaseDb = await _context.QuestionBases.FirstOrDefaultAsync(questionBase =>
            questionBase.Name == questionBaseName && questionBase.OwnerEmail == ownerEmail
        );

        if (questionBaseDb == null)
        {
            return Result.Error("Ta baza pytań nie istnieje");
        }

        var allQuestionList = await _context.Questions.ToListAsync();
        var baseQuestionList = allQuestionList.Where(question => question.QuestionBaseId == questionBaseDb.Id).ToList();
        baseQuestionList[questionIndex].Text = updatedQuestion.Content;

        var allAnswerList = await _context.Answers.ToListAsync();
        var answers = allAnswerList.Where(answer => answer.QuestionId == baseQuestionList[questionIndex].Id).ToList();

        for (int i = 0; i < answers.Count; i++)
        {
            answers[i].Text = updatedQuestion.Answers[i].Text;
            answers[i].IsCorrect = updatedQuestion.Answers[i].IsCorrect;
        }

        await _context.SaveChangesAsync();

        return Result.Success("Zapisano");
    }

    public async Task<Result> RemoveQuestionFromQuestionBase(string ownerEmail, string questionBaseName, int questionIndex)
    {
        var questionBaseDb = await _context.QuestionBases.FirstOrDefaultAsync(questionBase =>
            questionBase.Name == questionBaseName && questionBase.OwnerEmail == ownerEmail
        );

        if (questionBaseDb == null)
        {
            return Result.Error("Ta baza pytań nie istnieje");
        }

        var questionList = questionBaseDb.Questions;
        questionList.RemoveAt(questionIndex);

        await _context.SaveChangesAsync();

        return Result.Success("Usunięto pytanie");
    }
}