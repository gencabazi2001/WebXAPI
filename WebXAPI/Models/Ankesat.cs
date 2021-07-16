using System;
using System.Collections.Generic;

#nullable disable

namespace WebXAPI.Models
{
    public partial class Ankesat
    {
        

        public int Id { get; set; }
        public int UserId { get; set; }
        public string Description { get; set; }


        public virtual User AnkesaUserNavigation { get; set; }
    }
}
