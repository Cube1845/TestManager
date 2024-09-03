using Manager.Common;

namespace Manager.Manager.TestHistory.Models;

public class TestHistoryUnit
{
    public string Username { get; set; } = string.Empty;
    public List<SelectedAnswer> SelectedAnswers { get; set; } = [];
    public Score Score { get; set; }
    public string StartDate { get; set; } = string.Empty;
    public string FinishDate { get; set; } = string.Empty;
    public int TestHistoryId { get; set; }
}