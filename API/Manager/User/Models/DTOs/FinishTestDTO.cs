namespace Manager.User.Models.DTOs;

public record FinishTestDTO
{
    public string Username { get; set; } = string.Empty;
    public List<SelectedAnswer> SelectedAnswers { get; set; } = [];
}
