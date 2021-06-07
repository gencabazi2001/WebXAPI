using System;
using System.Collections.Generic;

#nullable disable

namespace WebXAPI.Models
{
    public partial class GroupMember
    {
        public int SubjectId { get; set; }
        public int UserId { get; set; }
        public DateTime? DateOfJoining { get; set; }

        public virtual Subject Subject { get; set; }
        public virtual User User { get; set; }
    }
}
