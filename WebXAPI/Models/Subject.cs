using System;
using System.Collections.Generic;

#nullable disable

namespace WebXAPI.Models
{
    public partial class Subject
    {
        public Subject()
        {
            GroupMembers = new HashSet<GroupMember>();
            PublicPosts = new HashSet<PublicPost>();
        }

        public int SubjectId { get; set; }
        public int DepartmentId { get; set; }
        public int SubjectSemester { get; set; }
        public string SubjectName { get; set; }
        public string SubjectDescription { get; set; }
        public int SubjectEcts { get; set; }
        public string SubjectCode { get; set; }
        public bool? IsActive { get; set; }

        public virtual Department Department { get; set; }
        public virtual ICollection<GroupMember> GroupMembers { get; set; }
        public virtual ICollection<PublicPost> PublicPosts { get; set; }
    }
}
