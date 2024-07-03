using Manager.Persistence;
using Manager.Persistence.Tables;
using Manager.Questions.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manager.Questions.QuestionBase
{
    public class QuestionBaseService(ManagerDbContext context)
    {
        private readonly ManagerDbContext _context = context;

        public async Task<List<string>> GetUsersQuestionBasesNames(string ownerEmail)
        {
            var questionBases = await _context.QuestionBases.ToListAsync();
            var usersQuestionBases = questionBases.Where(questionBase => questionBase.OwnerEmail == ownerEmail);
            List<string> usersQuestionBasesNames = new List<string>();

            foreach (var usersQuestionBase in usersQuestionBases)
            {
                usersQuestionBasesNames.Add(usersQuestionBase.Name);
            }

            return usersQuestionBasesNames;
        }
        
        public async Task CreateNewQuestionBase(string ownerEmail, string baseName)
        {
            var questionBaseDb = await _context.QuestionBases
                .FirstOrDefaultAsync(questionBase => 
                    (questionBase.Name == baseName && questionBase.OwnerEmail == ownerEmail)
                );

            if (questionBaseDb != null)
            {
                throw new Exception("This question base already exists");
            }

            var questionBase = new QuestionBases()
            {
                Name = baseName,
                Questions = JsonConvert.SerializeObject(new List<Question>()),
                OwnerEmail = ownerEmail,
            };

            await _context.QuestionBases.AddAsync(questionBase);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveQuestionBase(string ownerEmail, string baseName)
        {
            var questionBaseDb = await _context.QuestionBases
                .FirstOrDefaultAsync(questionBase =>
                    (questionBase.Name == baseName && questionBase.OwnerEmail == ownerEmail)
                );

            if (questionBaseDb == null)
            {
                throw new Exception("This question base does not exist");
            }

            _context.QuestionBases.Remove(questionBaseDb);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateQuestionBaseName(string ownerEmail, string oldBaseName, string newBaseName)
        {
            var questionBaseDb = await _context.QuestionBases
                .FirstOrDefaultAsync(questionBase =>
                    (questionBase.Name == newBaseName && questionBase.OwnerEmail == ownerEmail)
                );

            if (questionBaseDb != null)
            {
                throw new Exception("Question base with this name already exists");
            }

            questionBaseDb = await _context.QuestionBases
                .FirstOrDefaultAsync(questionBase =>
                    (questionBase.Name == oldBaseName && questionBase.OwnerEmail == ownerEmail)
                );

            if (questionBaseDb == null)
            {
                throw new Exception("This question base does not exist");
            }

            questionBaseDb.Name = newBaseName;
            await _context.SaveChangesAsync();
        }
    }
}
