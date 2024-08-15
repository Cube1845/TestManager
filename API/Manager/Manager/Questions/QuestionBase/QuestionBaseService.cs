using Manager.Common;
using Manager.Infrastructure;
using Manager.Persistence;
using Manager.Persistence.Tables;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manager.Manager.Questions.QuestionBase
{
    public class QuestionBaseService(ManagerDbContext context)
    {
        private readonly ManagerDbContext _context = context;

        public async Task<Result<List<string>>> GetUsersQuestionBasesNames(string ownerEmail)
        {
            var questionBases = await _context.QuestionBases.ToListAsync();
            var usersQuestionBases = questionBases.Where(questionBase => questionBase.OwnerEmail == ownerEmail);
            List<string> usersQuestionBasesNames = new List<string>();

            foreach (var usersQuestionBase in usersQuestionBases)
            {
                usersQuestionBasesNames.Add(usersQuestionBase.Name);
            }

            return Result<List<string>>.Success(usersQuestionBasesNames);
        }

        public async Task<Result> CreateNewQuestionBase(string ownerEmail, string baseName)
        {
            var questionBaseDb = await _context.QuestionBases
                .FirstOrDefaultAsync(questionBase =>
                    questionBase.Name == baseName && questionBase.OwnerEmail == ownerEmail
                );

            if (questionBaseDb != null)
            {
                return Result.Error("Ta baza pytań już istnieje");
            }

            var questionBase = new Persistence.Tables.QuestionBase()
            {
                Name = baseName,
                OwnerEmail = ownerEmail
            };

            await _context.QuestionBases.AddAsync(questionBase);
            await _context.SaveChangesAsync();

            return Result.Success("Dodano nową bazę pytań");
        }

        public async Task<Result> RemoveQuestionBase(string ownerEmail, string baseName)
        {
            var questionBaseDb = await _context.QuestionBases
                .FirstOrDefaultAsync(questionBase =>
                    questionBase.Name == baseName && questionBase.OwnerEmail == ownerEmail
                );

            if (questionBaseDb == null)
            {
                return Result.Error("Ta baza pytań nie istnieje");
            }

            _context.QuestionBases.Remove(questionBaseDb);
            await _context.SaveChangesAsync();

            return Result.Success("Usunięto bazę pytań: " + baseName);
        }

        public async Task<Result> UpdateQuestionBaseName(string ownerEmail, string oldBaseName, string newBaseName)
        {
            var questionBaseDb = await _context.QuestionBases
                .FirstOrDefaultAsync(questionBase =>
                    questionBase.Name == newBaseName && questionBase.OwnerEmail == ownerEmail
                );

            if (questionBaseDb != null)
            {
                return Result.Error("Baza pytań z taką nazwą już istnieje");
            }

            questionBaseDb = await _context.QuestionBases
                .FirstOrDefaultAsync(questionBase =>
                    questionBase.Name == oldBaseName && questionBase.OwnerEmail == ownerEmail
                );

            if (questionBaseDb == null)
            {
                return Result.Error("Ta baza pytań nie istnieje");
            }

            questionBaseDb!.Name = newBaseName;
            await _context.SaveChangesAsync();

            return Result.Success("Zapisano");
        }
    }
}
