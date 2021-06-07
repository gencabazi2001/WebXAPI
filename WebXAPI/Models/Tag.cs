using System;
using System.Collections.Generic;

#nullable disable

namespace WebXAPI.Models
{
    public partial class Tag
    {
        public Tag()
        {
            TagsPosts = new HashSet<TagsPost>();
        }

        public string TagName { get; set; }

        public virtual ICollection<TagsPost> TagsPosts { get; set; }
    }
}
