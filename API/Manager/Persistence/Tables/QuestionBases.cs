using Manager.Questions.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manager.Persistence.Tables
{
    public class QuestionBases
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Questions { get; set; } = "";
        public string OwnerEmail { get; set; } = "";
    }
}
