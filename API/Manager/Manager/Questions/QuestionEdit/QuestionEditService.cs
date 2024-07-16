using Manager.Infrastructure;
using Manager.Manager.Questions.Models;
using Manager.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manager.Manager.Questions.QuestionEdit;

public class QuestionEditService(ManagerDbContext context)
{
    private readonly ManagerDbContext _context = context;

    public async Task<Result<List<Question>>> GetUsersQuestionsFromQuestionBase(string ownerEmail, string questionBaseName)
    {
        var questionBaseDb = await _context.QuestionBases.FirstOrDefaultAsync(questionBase =>
            questionBase.Name == questionBaseName && questionBase.OwnerEmail == ownerEmail
        );

        if (questionBaseDb == null)
        {
            return Result<List<Question>>.Error("Ta baza pytań nie istnieje");
        }

        var serializedQuestionList = questionBaseDb.Questions;
        var questionList = JsonConvert.DeserializeObject<List<Question>>(serializedQuestionList);

        return Result<List<Question>>.Success(questionList!);
    }

    public async Task<Result> AddQuestionToQuestionBase(string ownerEmail, string questionBaseName, Question questionToAdd)
    {
        var questionBaseDb = await _context.QuestionBases.FirstOrDefaultAsync(questionBase =>
            questionBase.Name == questionBaseName && questionBase.OwnerEmail == ownerEmail
        );

        if (questionBaseDb == null)
        {
            return Result.Error("Ta baza pytań nie istnieje");
        }

        var serializedQuestionList = questionBaseDb.Questions;
        var questionList = JsonConvert.DeserializeObject<List<Question>>(serializedQuestionList);

        foreach (Question question in questionList!)
        {
            if (question.Content == questionToAdd.Content)
            {
                return Result.Error("Takie pytanie już istnieje");
            }
        }

        questionList!.Add(questionToAdd);
        serializedQuestionList = JsonConvert.SerializeObject(questionList);

        questionBaseDb.Questions = serializedQuestionList;
        await _context.SaveChangesAsync();

        return Result.Success("Dodano pytanie");
    }

    public async Task<Result> UpdateQuestionInQuestionBase(string ownerEmail, string questionBaseName, int questionIndex, Question updatedQuestion)
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