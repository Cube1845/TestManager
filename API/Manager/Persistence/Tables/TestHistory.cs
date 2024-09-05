namespace Manager.Persistence.Tables;

public class TestHistory
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public int TestId { get; set; }
    public Test Test { get; set; } = default!;
    public string SelectedAnswers { get; set; } = string.Empty;
    public string Score { get; set; } = string.Empty;
    public string StartDate {  get; set; } = string.Empty;
    public string FinishDate {  get; set; } = string.Empty;
}
