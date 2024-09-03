using Manager.Common;
using Manager.Infrastructure;
using Manager.Manager.TestHistory.Models;
using Manager.Persistence;
using Manager.Persistence.Tables;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Linq;

namespace Manager.Manager.TestHistory.SelectedAnswers;

public class SelectedAnswersService(ManagerDbContext dbContext)
{
    private readonly ManagerDbContext _context = dbContext;

    public async Task<Result<ContentSelectedAnswers>> GetSelectedAnswersContent(int testHistoryId)
    {
        var testHistoryDb = await _context.TestHistory
            .FirstOrDefaultAsync(testHistory => testHistory.Id == testHistoryId);

        if (testHistoryDb == null)
        {
            return Result<ContentSelectedAnswers>.Error("Taka historia testu nie istnieje");
        }

        var selectedAnswerList = JsonConvert.DeserializeObject<List<SelectedAnswer>>(testHistoryDb.SelectedAnswers)!;

        var usedQuestionIds = selectedAnswerList.Select(answer => answer.QuestionId).ToList();
        var usedQuestionsDb = await _context.Questions
            .Where(question => usedQuestionIds.Contains(question.Id))
            .ToListAsync();

        var selectedAnswersIds = selectedAnswerList.Select(answer => answer.AnswerId);
        var usedAnswersDb = await _context.Answers
            .Where(answer => 
                usedQuestionIds.Contains(answer.QuestionId) && 
                (selectedAnswersIds.Contains(answer.Id) || answer.IsCorrect))
            .ToListAsync();

        var correctUsedAnswers = usedAnswersDb
            .Where(answer => answer.IsCorrect)
            .ToList();

        List<ContentSelectedAnswer> selectedAnswersWithContent = selectedAnswerList
            .Select(answer => new ContentSelectedAnswer()
            {
                QuestionContent = usedQuestionsDb
                    .First(question => question.Id == answer.QuestionId).Text,
                SelectedAnswerContent = usedAnswersDb
                    .First(selectedAnswer => selectedAnswer.Id == answer.AnswerId).Text,
                CorrectAnswerContent = correctUsedAnswers
                    .First(correctAnswer => correctAnswer.QuestionId == answer.QuestionId).Text,
            })
            .ToList();

        return Result<ContentSelectedAnswers>.Success(new(selectedAnswersWithContent));
    }
}
