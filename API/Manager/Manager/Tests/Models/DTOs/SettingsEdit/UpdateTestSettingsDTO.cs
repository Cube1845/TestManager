using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Manager.Manager.Tests.Models;

namespace Manager.Manager.Tests.Models.DTOs.SettingsEdit
{
    public record UpdateTestSettingsDTO
    {
        public string Name { get; set; } = "";
        public NameTestSettings Settings { get; set; } = new();
    }
}
