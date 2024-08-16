using System.ComponentModel.DataAnnotations;

namespace Manager.Persistence.Tables
{
    public class QuestionBase
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string OwnerEmail { get; set; } = string.Empty;
        public List<Question> Questions { get; set; } = [];
    }
}
