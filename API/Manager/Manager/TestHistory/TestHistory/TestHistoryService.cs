using Manager.Infrastructure;
using Manager.Manager.TestHistory.Models;
using Manager.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Manager.Manager.TestHistory.TestHistory;

public class TestHistoryService(ManagerDbContext dbContext)
{
    private readonly ManagerDbContext _context = dbContext;

    public async Task<Result<TestHistoryUnit>> GetTestHistory(string ownerEmail, string testName)
    {
        var test = await _context.Tests
            .FirstOrDefaultAsync(test => test.Name == testName && test.OwnerEmail == ownerEmail);

        if (test == null)
        {
            return Result<TestHistoryUnit>.Error("Taki test nie istnieje");
        }

        int testId = test.Id;

        var testHistory = await _context.TestHistory
            .Where(testHistoryUnit => testHistoryUnit.TestId == testId)
            .ToListAsync();
    }
}
