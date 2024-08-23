namespace Manager.User.Models.DTOs;

public record FinishTestDTO
{
    public int TestId { get; set; }
    public string Username { get; set; } = string.Empty;
    public List<SelectedAnswer> SelectedAnswers { get; set; } = [];
}
