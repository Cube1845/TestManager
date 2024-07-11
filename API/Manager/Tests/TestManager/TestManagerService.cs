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

        public async Task<List<string>> GetUsersTestNames(string ownerEmail)
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

            return testNames;
        }

        public async Task CreateNewTest(string ownerEmail, string name) 
        {
            var testsDb = await _context.Tests.FirstOrDefaultAsync(test => test.Name == name && test.OwnerEmail == ownerEmail);

            if (testsDb != null)
            {
                throw new Exception("Test with this name already exists");
            }

            var newTest = new Persistence.Tables.Tests()
            {
                Name = name,
                OwnerEmail = ownerEmail,
                Settings = JsonConvert.SerializeObject(new TestSettings())
            };

            await _context.Tests.AddAsync(newTest);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveTest(string ownerEmail, string name)
        {
            var testsDb = await _context.Tests.FirstOrDefaultAsync(test => test.Name == name && test.OwnerEmail == ownerEmail);

            if (testsDb == null)
            {
                throw new Exception("This test does not exist");
            }

            _context.Remove(testsDb);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateTestName(string ownerEmail, string oldName, string newName)
        {
            var testsDb = await _context.Tests.FirstOrDefaultAsync(test => test.Name == oldName && test.OwnerEmail == ownerEmail);

            if (testsDb == null)
            {
                throw new Exception("This test does not exist");
            }

            var testsDbCheck = await _context.Tests.FirstOrDefaultAsync(test => test.Name == newName && test.OwnerEmail == ownerEmail);

            if (testsDbCheck != null)
            {
                throw new Exception("Test with this name already exists");
            }

            testsDb.Name = newName;
            await _context.SaveChangesAsync();
        }
    }
}
