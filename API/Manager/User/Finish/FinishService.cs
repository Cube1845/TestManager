using Manager.Common;
using Manager.Persistence;
using Manager.User.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Manager.User.Finish;

public class FinishService(ManagerDbContext dbContext)
{
    private readonly ManagerDbContext _context = dbContext;

    public async Task<Score> FinishTest(FinishTestDTO dto)
    {
        Score score = await GetScore(dto.SelectedAnswers);

        var history = new Persistence.Tables.TestHistory()
        {
            SelectedAnswers = JsonConvert.SerializeObject(dto.SelectedAnswers),
            TestId = dto.TestId,
            Score = JsonConvert.SerializeObject(score),
            Username = dto.Username,
            StartDate = dto.StartDate,
            FinishDate = DateTime.Now.ToString("dd.MM.yyyy HH:mm:ss")
        };

        await _context.TestHistory.AddAsync(history);
        await _context.SaveChangesAsync();

        return score;
    }

    private async Task<Score> GetScore(List<SelectedAnswer> selectedAnswers)
    {
        int maxPoints = selectedAnswers.Count;

        List<int> answerIds = [];

        foreach (var answer in selectedAnswers)
        {
            answerIds.Add(answer.AnswerId);
        }

        var answersDb = await _context.Answers.Where(answer => answerIds.Contains(answer.Id)).ToListAsync();
        int earnedPoints = 0;

        foreach (var answer in answersDb)
        {
            if (answer.IsCorrect)
            {
                earnedPoints++;
            }
        }

        Score score = new()
        {
            MaximumPoints = maxPoints,
            EarnedPoints = earnedPoints
        };

        return score;
    }
}
