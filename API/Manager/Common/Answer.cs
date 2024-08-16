namespace Manager.Common;

public record Answer
{
    public string Text { get; set; }
    public bool IsCorrect { get; set; }
}
