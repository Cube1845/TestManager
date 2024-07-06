using Manager.Persistence;
using Manager.Questions.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manager.Questions.QuestionEdit;

public class QuestionEditService(ManagerDbContext context)
{
    private readonly ManagerDbContext _context = context;

    public async Task<List<Question>> GetUsersQuestionsFromQuestionBase(string ownerEmail, string questionBaseName)
    {
        var questionBaseDb = await _context.QuestionBases.FirstOrDefaultAsync(questionBase =>
            (questionBase.Name == questionBaseName && questionBase.OwnerEmail == ownerEmail)
        );

        if (questionBaseDb == null)
        {
            throw new Exception("This question base does not exist");
        }

        var serializedQuestionList = questionBaseDb.Questions;
        var questionList = JsonConvert.DeserializeObject<List<Question>>(serializedQuestionList);

        return questionList!;
    }

    public async Task AddQuestionToQuestionBase(string ownerEmail, string questionBaseName, Question questionToAdd)
    {
        var questionBaseDb = await _context.QuestionBases.FirstOrDefaultAsync(questionBase =>
            (questionBase.Name == questionBaseName && questionBase.OwnerEmail == ownerEmail)
        );

        if (questionBaseDb == null)
        {
            throw new Exception("This question base does not exist");
        }

        var serializedQuestionList = questionBaseDb.Questions;
        var questionList = JsonConvert.DeserializeObject<List<Question>>(serializedQuestionList);

        foreach (Question question in questionList!)
        {
            if (question.Content == questionToAdd.Content)
            {
                throw new Exception("This question already exist");
            }
        }

        questionList!.Add(questionToAdd);
        serializedQuestionList = JsonConvert.SerializeObject(questionList);

        questionBaseDb.Questions = serializedQuestionList;
        await _context.SaveChangesAsync();
    }

    public async Task UpdateQuestionInQuestionBase(string ownerEmail, string questionBaseName, int questionIndex, Question updatedQuestion)
    {
        var questionBaseDb = await _context.QuestionBases.FirstOrDefaultAsync(questionBase =>
            (questionBase.Name == questionBaseName && questionBase.OwnerEmail == ownerEmail)
        );

        if (questionBaseDb == null)
        {
            throw new Exception("This question base does not exist");
        }

        var serializedQuestionList = questionBaseDb.Questions;
        var questionList = JsonConvert.DeserializeObject<List<Question>>(serializedQuestionList)!;

        questionList[questionIndex] = updatedQuestion;
        serializedQuestionList = JsonConvert.SerializeObject(questionList);

        questionBaseDb.Questions = serializedQuestionList;
        await _context.SaveChangesAsync();
    }

    public async Task RemoveQuestionFromQuestionBase(string ownerEmail, string questionBaseName, int questionIndex)
    {
        var questionBaseDb = await _context.QuestionBases.FirstOrDefaultAsync(questionBase =>
            (questionBase.Name == questionBaseName && questionBase.OwnerEmail == ownerEmail)
        );

        if (questionBaseDb == null)
        {
            throw new Exception("This question base does not exist");
        }

        var serializedQuestionList = questionBaseDb.Questions;
        var questionList = JsonConvert.DeserializeObject<List<Question>>(serializedQuestionList)!;

        questionList.RemoveAt(questionIndex);
        serializedQuestionList = JsonConvert.SerializeObject(questionList);

        questionBaseDb.Questions = serializedQuestionList;
        await _context.SaveChangesAsync();
    }
}