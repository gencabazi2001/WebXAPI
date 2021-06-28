using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace WebXAPI.Models
{
    public partial class User
    {
        public User()
        {
            GroupMembers = new HashSet<GroupMember>();
            PostVotes = new HashSet<PostVote>();
            PrivateGroupMembers = new HashSet<PrivateGroupMember>();
            PrivateGroups = new HashSet<PrivateGroup>();
            PublicPosts = new HashSet<PublicPost>();
        }

        public int UserId { get; set; }
        public string UserEmail { get; set; }
        public string UserPassword { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public string UserDescription { get; set; }
        public string UserPhotoFileName { get; set; }
        public int UserDepartment { get; set; }
        public string UserRole { get; set; }

        
        [NotMapped]
        public IFormFile File { get; set; }

        
        public virtual Department UserDepartmentNavigation { get; set; }
        public virtual Staff Staff { get; set; }
        public virtual ICollection<GroupMember> GroupMembers { get; set; }
        public virtual ICollection<PostVote> PostVotes { get; set; }
        public virtual ICollection<PrivateGroupMember> PrivateGroupMembers { get; set; }
        public virtual ICollection<PrivateGroup> PrivateGroups { get; set; }
        public virtual ICollection<PublicPost> PublicPosts { get; set; }
    }
}
