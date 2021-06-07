using System;
using System.Collections.Generic;

#nullable disable

namespace WebXAPI.Models
{
    public partial class PublicPost
    {
        public PublicPost()
        {
            InverseReplyToNavigation = new HashSet<PublicPost>();
            PostVotes = new HashSet<PostVote>();
            TagsPosts = new HashSet<TagsPost>();
        }

        public int PostId { get; set; }
        public int UserId { get; set; }
        public int? SubjectId { get; set; }
        public string PostName { get; set; }
        public string PostDesc { get; set; }
        public string PhotoFileName { get; set; }
        public int? PgId { get; set; }
        public int? ReplyTo { get; set; }

        public virtual PrivateGroup Pg { get; set; }
        public virtual PublicPost ReplyToNavigation { get; set; }
        public virtual Subject Subject { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<PublicPost> InverseReplyToNavigation { get; set; }
        public virtual ICollection<PostVote> PostVotes { get; set; }
        public virtual ICollection<TagsPost> TagsPosts { get; set; }
    }
}
