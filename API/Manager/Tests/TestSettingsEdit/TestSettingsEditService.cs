using Manager.Infrastructure;
using Manager.Persistence;
using Manager.Tests.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manager.Tests.TestSettingsEdit
{
    public class TestSettingsEditService(ManagerDbContext dbContext)
    {
        private readonly ManagerDbContext _context = dbContext;

        public async Task<Result<TestSettings>> GetTestsSettings(string ownerEmail, string testName)
        {
            var testDb = await _context.Tests.FirstOrDefaultAsync(test => test.Name == testName && test.OwnerEmail == ownerEmail);

            if (testDb == null)
            {
                return Result<TestSettings>.Error("Taki test nie istnieje");
            }

            var settings = JsonConvert.DeserializeObject<TestSettings>(testDb.Settings)!;

            return Result<TestSettings>.Success(settings);
        }

        public async Task<Result> UpdateTestSettings(string ownerEmail, string testName, TestSettings newSettings)
        {
            var testDb = await _context.Tests.FirstOrDefaultAsync(test => test.Name == testName && test.OwnerEmail == ownerEmail);

            if (testDb == null)
            {
                return Result.Error("Taki test nie istnieje");
            }

            testDb.Settings = JsonConvert.SerializeObject(newSettings);
            await _context.SaveChangesAsync();

            return Result.Success("Zapisano");
        }
    }
}
