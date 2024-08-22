namespace Manager.User.Models;

public record SelectedAnswer
{
    public int QuestionId { get; set; }
    public int AnswerId { get; set; }
}
