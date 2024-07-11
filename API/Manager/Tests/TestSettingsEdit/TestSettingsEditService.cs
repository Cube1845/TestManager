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

        public async Task<TestSettings> GetTestsSettings(string ownerEmail, string testName)
        {
            var testDb = await _context.Tests.FirstOrDefaultAsync(test => test.Name == testName && test.OwnerEmail == ownerEmail);

            if (testDb == null)
            {
                throw new Exception("This test does not exist");
            }

            var settings = JsonConvert.DeserializeObject<TestSettings>(testDb.Settings)!;
            return settings;
        }

        public async Task UpdateTestSettings(string ownerEmail, string testName, TestSettings newSettings)
        {
            var testDb = await _context.Tests.FirstOrDefaultAsync(test => test.Name == testName && test.OwnerEmail == ownerEmail);

            if (testDb == null)
            {
                throw new Exception("This test does not exist");
            }

            testDb.Settings = JsonConvert.SerializeObject(newSettings);
            await _context.SaveChangesAsync();
        }
    }
}
