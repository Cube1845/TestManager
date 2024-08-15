using Manager.Persistence.Tables;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Manager.Persistence;

public class ManagerDbContext(DbContextOptions<ManagerDbContext> options) : IdentityDbContext<IdentityUser>(options)
{
    public DbSet<QuestionBase> QuestionBases { get; set; }
    public DbSet<Tables.Test> Tests { get; set; }
    public DbSet<Question> Questions { get; set; }
    public DbSet<Answer> Answers { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<QuestionBase>(x => 
        {
            x.HasKey(e => e.Id);
            x.Property(e => e.OwnerEmail).IsRequired();
            x.Property(e => e.Name).IsRequired();
            x.HasMany(e => e.Questions).WithOne(e => e.QuestionBase);
        });

        builder.Entity<Test>(x =>
        {
            x.HasKey(e => e.Id);
            x.Property(e => e.OwnerEmail).IsRequired();
            x.Property(e => e.Name).IsRequired();
        });

        builder.Entity<Question>(x =>
        {
            x.HasKey(e => e.Id);
            x.HasMany(e => e.Answers).WithOne(e => e.Question);
        });

        builder.Entity<Answer>(x =>
        {
            x.HasKey(e => e.Id);
            x.HasOne(e => e.Question);
        });
    }
}
