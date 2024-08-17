namespace Manager.User.Models;

public record IdentifiedAnswer
{
    public string Text { get; set; } = string.Empty;
    public int AnswerId { get; set; }
}
