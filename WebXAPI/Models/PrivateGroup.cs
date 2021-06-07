using System;
using System.Collections.Generic;

#nullable disable

namespace WebXAPI.Models
{
    public partial class PrivateGroup
    {
        public PrivateGroup()
        {
            PrivateGroupMembers = new HashSet<PrivateGroupMember>();
            PublicPosts = new HashSet<PublicPost>();
        }

        public int PgId { get; set; }
        public int UserId { get; set; }
        public string PgName { get; set; }
        public string PgDescription { get; set; }
        public DateTime? DateOfCreation { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<PrivateGroupMember> PrivateGroupMembers { get; set; }
        public virtual ICollection<PublicPost> PublicPosts { get; set; }
    }
}
