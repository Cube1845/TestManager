using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manager.Persistence.Tables
{
    public class Tests
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string OwnerEmail { get; set; } = string.Empty;
        public string Settings { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
    }
}
