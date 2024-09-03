using Manager.Common;
using Manager.Infrastructure;
using Manager.Manager.TestHistory.Models;
using Manager.Persistence;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Manager.Manager.TestHistory.TestHistory;

public class TestHistoryService(ManagerDbContext dbContext)
{
    private readonly ManagerDbContext _context = dbContext;

    public async Task<Result<Models.TestHistory>> GetTestHistory(string ownerEmail, string testName)
    {
        var test = await _context.Tests
            .FirstOrDefaultAsync(test => test.Name == testName && test.OwnerEmail == ownerEmail);

        if (test == null)
        {
            return Result<Models.TestHistory>.Error("Taki test nie istnieje");
        }

        int testId = test.Id;

        var testHistoryDb = await _context.TestHistory
            .Where(testHistoryUnit => testHistoryUnit.TestId == testId)
            .ToListAsync();

        List<TestHistoryUnit> testHistory = testHistoryDb
            .Select(testHistoryUnit => new TestHistoryUnit()
            {
                Username = testHistoryUnit.Username,
                SelectedAnswers = JsonConvert.DeserializeObject<List<SelectedAnswer>>(testHistoryUnit.SelectedAnswers)!,
                Score = JsonConvert.DeserializeObject<Score>(testHistoryUnit.Score)!,
                StartDate = testHistoryUnit.StartDate,
                FinishDate = testHistoryUnit.FinishDate,
                TestHistoryId = testHistoryUnit.Id,
            })
            .ToList();

        return Result<Models.TestHistory>.Success(new(testHistory));
    }
}
