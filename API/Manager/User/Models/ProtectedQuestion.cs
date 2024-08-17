namespace Manager.User.Models;

public record ProtectedQuestion
{
    public int QuestionId { get; set; }
    public string Content { get; set; } = string.Empty;
    public List<IdentifiedAnswer> Answers { get; set; } = [];
}
