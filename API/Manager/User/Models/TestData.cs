namespace Manager.User.Models;

public record TestData
{
    public int TestId { get; set; }
    public List<ProtectedQuestion> Questions { get; set; } = [];
}
