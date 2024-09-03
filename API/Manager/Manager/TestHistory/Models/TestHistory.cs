namespace Manager.Manager.TestHistory.Models;

public record TestHistory(List<TestHistoryUnit> history)
{
    public List<TestHistoryUnit> History { get; set; } = history;
}
