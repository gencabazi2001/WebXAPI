using System;
using System.Collections.Generic;

#nullable disable

namespace WebXAPI.Models
{
    public partial class PrivateGroupMember
    {
        public int PgId { get; set; }
        public int UserId { get; set; }
        public DateTime DateOfJoining { get; set; }

        public virtual PrivateGroup Pg { get; set; }
        public virtual User User { get; set; }
    }
}
