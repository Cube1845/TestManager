using Manager.Infrastructure;
using Manager.Manager.Tests.Models;
using Manager.Persistence;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manager.Manager.Tests.TestSettingsEdit
{
    public class TestSettingsEditService(ManagerDbContext dbContext, CodeGeneratorService codeGeneratorService)
    {
        private readonly ManagerDbContext _context = dbContext;
        private readonly CodeGeneratorService _codeGeneratorService = codeGeneratorService;

        private readonly int codeSize = 10;

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

        public async Task<Result<string>> GetTestCode(string ownerEmail, string testName)
        {
            var testDb = 
                await _context.Tests.FirstOrDefaultAsync(test => test.Name == testName && test.OwnerEmail == ownerEmail);

            if (testDb == null)
            {
                return Result<string>.Error("Taki test nie istnieje");
            }

            string code = testDb.Code;

            if (code == null)
            {
                return Result<string>.Success(string.Empty);
            }

            return Result<string>.Success(code);
        }

        public async Task<Result> GenerateNewTestCode(string ownerEmail, string testName)
        {
            var testDb =
                await _context.Tests.FirstOrDefaultAsync(test => test.Name == testName && test.OwnerEmail == ownerEmail);

            if (testDb == null)
            {
                return Result.Error("Taki test nie istnieje");
            }

            TestSettings settings = JsonConvert.DeserializeObject<TestSettings>(testDb.Settings)!;

            if (settings.UsedQuestionBases.Count < 1)
            {
                return Result.Error("Musisz wybrać przynajmniej jedną bazę pytań");
            }

            string newCode = string.Empty;

            do
            {
                newCode = _codeGeneratorService.GenerateCode(codeSize);
            }
            while (await CodeAlreadyExist(newCode));

            testDb.Code = newCode;
            await _context.SaveChangesAsync();

            return Result.Success("Wygenerowano nowy kod dla testu: " + testName);
        }

        private async Task<bool> CodeAlreadyExist(string code)
        {
            var tests = await _context.Tests.ToListAsync();

            foreach (var test in tests)
            {
                if (test.Code == code)
                {
                    return true;
                }
            }

            return false;
        }
    }
}
