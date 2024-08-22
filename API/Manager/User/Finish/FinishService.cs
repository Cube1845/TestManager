using Manager.Persistence;

namespace Manager.User.Finish;

public class FinishService(ManagerDbContext dbContext)
{
    private readonly ManagerDbContext _context = dbContext;
}
