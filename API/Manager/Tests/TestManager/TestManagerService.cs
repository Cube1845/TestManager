using Manager.Infrastructure;
using Manager.Persistence;
using Manager.Tests.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Drawing;

namespace Manager.Tests.TestManager
{
    public class TestManagerService(ManagerDbContext dbContext)
    {
        private readonly ManagerDbContext _context = dbContext;

        public async Task<Result<List<string>>> GetUsersTestNames(string ownerEmail)
        {
            var testDbList = await _context.Tests.ToListAsync();
            List<string> testNames = new List<string>();    

            foreach (var test in testDbList)
            {
                if (test.OwnerEmail == ownerEmail)
                {
                    testNames.Add(test.Name);
                }
            }

            return Result<List<string>>.Success(testNames);
        }

        public async Task<Result> CreateNewTest(string ownerEmail, string name) 
        {
            var testsDb = await _context.Tests.FirstOrDefaultAsync(test => test.Name == name && test.OwnerEmail == ownerEmail);

            if (testsDb != null)
            {
                return Result.Error("Test z taką nazwą już istnieje");
            }

            var newTest = new Persistence.Tables.Tests()
            {
                Name = name,
                OwnerEmail = ownerEmail,
                Settings = JsonConvert.SerializeObject(new TestSettings())
            };

            await _context.Tests.AddAsync(newTest);
            await _context.SaveChangesAsync();

            return Result.Success("Dodano nowy test");
        }

        public async Task<Result> RemoveTest(string ownerEmail, string name)
        {
            var testsDb = await _context.Tests.FirstOrDefaultAsync(test => test.Name == name && test.OwnerEmail == ownerEmail);

            if (testsDb == null)
            {
                return Result.Error("Taki test nie istnieje");
            }

            _context.Remove(testsDb);
            await _context.SaveChangesAsync();

            return Result.Success("Usunięto test: " + name);
        }

        public async Task<Result> UpdateTestName(string ownerEmail, string oldName, string newName)
        {
            var testsDb = await _context.Tests.FirstOrDefaultAsync(test => test.Name == oldName && test.OwnerEmail == ownerEmail);

            if (testsDb == null)
            {
                return Result.Error("Ten test nie istnieje");
            }

            var testsDbCheck = await _context.Tests.FirstOrDefaultAsync(test => test.Name == newName && test.OwnerEmail == ownerEmail);

            if (testsDbCheck != null)
            {
                return Result.Error("Test z taką nazwą już istnieje");
            }

            testsDb.Name = newName;
            await _context.SaveChangesAsync();

            return Result.Success("Zapisano");
        }
    }
}
