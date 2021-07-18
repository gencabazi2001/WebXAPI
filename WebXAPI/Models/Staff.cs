using System;
using System.Collections.Generic;

#nullable disable

namespace WebXAPI.Models
{
    public partial class Staff
    {
        public int UserId { get; set; }
        public string StaffPosition { get; set; }

        public string StaffDescription { get; set; }

        public virtual User User { get; set; }
    }
}
