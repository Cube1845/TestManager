using Manager.Common;

namespace Manager.User.Models.DTOs;

public record FinishTestDTO
{
    public string StartDate { get; set; } = string.Empty;
    public int TestId { get; set; }
    public string Username { get; set; } = string.Empty;
    public List<SelectedAnswer> SelectedAnswers { get; set; } = [];
}
