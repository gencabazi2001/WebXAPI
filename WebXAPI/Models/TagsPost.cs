using System;
using System.Collections.Generic;

#nullable disable

namespace WebXAPI.Models
{
    public partial class TagsPost
    {
        public string TagName { get; set; }
        public int PostId { get; set; }

        public virtual PublicPost Post { get; set; }
        public virtual Tag TagNameNavigation { get; set; }
    }
}
