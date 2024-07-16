using System.ComponentModel.DataAnnotations;

namespace Manager.Persistence.Tables
{
    public class QuestionBases
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Questions { get; set; } = string.Empty;
        public string OwnerEmail { get; set; } = string.Empty;
    }
}
