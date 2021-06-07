using System;
using System.Collections.Generic;

#nullable disable

namespace WebXAPI.Models
{
    public partial class Department
    {
        public Department()
        {
            Subjects = new HashSet<Subject>();
            Users = new HashSet<User>();
        }

        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public string DepartmentDescription { get; set; }
        public int DepartmentSemesters { get; set; }
        public bool? IsActive { get; set; }

        public virtual ICollection<Subject> Subjects { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
