namespace Manager.Manager.TestHistory.Models;

public class TestHistory(List<TestHistoryUnit> history)
{
    public List<TestHistoryUnit> History { get; set; } = history;
}
