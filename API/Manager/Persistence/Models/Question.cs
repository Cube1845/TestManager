namespace Manager.Persistence.Tables;

public class Question
{
    public int Id { get; set; }
    public int QuestionBaseId { get; set; }
    public QuestionBase QuestionBase { get; set; }
    public string Text { get; set; }
    public List<Answer> Answers { get; set; } = [];
}
