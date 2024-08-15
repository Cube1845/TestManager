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

        int questionBaseId = questionBaseDb.Id;

        var allQuestionList = await _context.Questions.ToListAsync();
        var baseQuestionList = allQuestionList.Where(question => question.QuestionBaseId == questionBaseId).ToList();

        List<Common.Question> questionList = [];
        var allAnswers = await _context.Answers.ToListAsync();

        foreach (var question in baseQuestionList)
        {
            int id = question.Id;
            var answersToCurrentQuestion = allAnswers.Where(answer => answer.QuestionId == id).ToList();

            List<string> answers = [];
            int correctAnswerIndex = 0;

            for (int i = 0; i < answersToCurrentQuestion.Count; i++)
            {
                answers.Add(answersToCurrentQuestion[i].Text);

                if (answersToCurrentQuestion[i].IsCorrect)
                {
                    correctAnswerIndex = i;
                }
            }

            questionList.Add(
                new Common.Question()
                {
                    Content = question.Text,
                    Answers = answers,
                    CorrectAnswerIndex = correctAnswerIndex
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
        };

        await _context.Questions.AddAsync(question);
        await _context.SaveChangesAsync();

        Persistence.Tables.Answer answer;

        for (int i = 0; i < questionToAdd.Answers.Count; i++)
        {
            answer = new Persistence.Tables.Answer()
            {
                Text = questionToAdd.Answers[i],
                QuestionId = question.Id,
                IsCorrect = false
            };

            if (questionToAdd.CorrectAnswerIndex == i)
            {
                answer.IsCorrect = true;
            }

            await _context.Answers.AddAsync(answer);
        }
        
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

        var serializedQuestionList = questionBaseDb.Questions;
        var questionList = JsonConvert.DeserializeObject<List<Common.Question>>(serializedQuestionList)!;

        questionList[questionIndex] = updatedQuestion;
        serializedQuestionList = JsonConvert.SerializeObject(questionList);

        questionBaseDb.Questions = serializedQuestionList;
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

        var serializedQuestionList = questionBaseDb.Questions;
        var questionList = JsonConvert.DeserializeObject<List<Question>>(serializedQuestionList)!;

        questionList.RemoveAt(questionIndex);
        serializedQuestionList = JsonConvert.SerializeObject(questionList);

        questionBaseDb.Questions = serializedQuestionList;
        await _context.SaveChangesAsync();

        return Result.Success("Usunięto pytanie");
    }
}