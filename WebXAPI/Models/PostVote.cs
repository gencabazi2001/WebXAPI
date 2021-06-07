using System;
using System.Collections.Generic;

#nullable disable

namespace WebXAPI.Models
{
    public partial class PostVote
    {
        public int PostId { get; set; }
        public int UserId { get; set; }
        public int Vote { get; set; }

        public virtual PublicPost Post { get; set; }
        public virtual User User { get; set; }
    }
}
