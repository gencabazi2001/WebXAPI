using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace WebXAPI.Models
{
    public partial class MPID3828295Context : DbContext
    {
        public MPID3828295Context()
        {
        }

        public MPID3828295Context(DbContextOptions<MPID3828295Context> options)
            : base(options)
        {
        }

        public virtual DbSet<Department> Departments { get; set; }
        public virtual DbSet<GroupMember> GroupMembers { get; set; }
        public virtual DbSet<PostVote> PostVotes { get; set; }
        public virtual DbSet<PrivateGroup> PrivateGroups { get; set; }
        public virtual DbSet<PrivateGroupMember> PrivateGroupMembers { get; set; }
        public virtual DbSet<PublicPost> PublicPosts { get; set; }
        public virtual DbSet<Staff> Staffs { get; set; }
        public virtual DbSet<Subject> Subjects { get; set; }
        public virtual DbSet<Tag> Tags { get; set; }
        public virtual DbSet<TagsPost> TagsPosts { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Name=MPID3828295");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Department>(entity =>
            {
                entity.Property(e => e.DepartmentId).HasColumnName("departmentID");

                entity.Property(e => e.DepartmentDescription)
                    .HasMaxLength(50)
                    .HasColumnName("departmentDescription");

                entity.Property(e => e.DepartmentName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("departmentName");

                entity.Property(e => e.DepartmentSemesters).HasColumnName("departmentSemesters");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasColumnName("isActive")
                    .HasDefaultValueSql("((1))");
            });

            modelBuilder.Entity<GroupMember>(entity =>
            {
                entity.HasKey(e => new { e.SubjectId, e.UserId });

                entity.Property(e => e.SubjectId).HasColumnName("subjectID");

                entity.Property(e => e.UserId).HasColumnName("userID");

                entity.Property(e => e.DateOfJoining).HasColumnType("date");

                entity.HasOne(d => d.Subject)
                    .WithMany(p => p.GroupMembers)
                    .HasForeignKey(d => d.SubjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_GroupMembers_Subjects");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.GroupMembers)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_GroupMembers_GroupMembers");
            });

            modelBuilder.Entity<PostVote>(entity =>
            {
                entity.HasKey(e => new { e.PostId, e.UserId })
                    .HasName("PK__PostVote__31B5D277EA050794");

                entity.Property(e => e.PostId).HasColumnName("postID");

                entity.Property(e => e.UserId).HasColumnName("userID");

                entity.Property(e => e.Vote).HasColumnName("vote");

                entity.HasOne(d => d.Post)
                    .WithMany(p => p.PostVotes)
                    .HasForeignKey(d => d.PostId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PostVotes_PublicPost");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.PostVotes)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PostVotes_Users");
            });

            modelBuilder.Entity<PrivateGroup>(entity =>
            {
                entity.HasKey(e => e.PgId)
                    .HasName("PK_PrivateGroups_1");

                entity.Property(e => e.PgId)
                    .ValueGeneratedNever()
                    .HasColumnName("pgID");

                entity.Property(e => e.DateOfCreation).HasColumnType("date");

                entity.Property(e => e.PgDescription)
                    .IsRequired()
                    .HasMaxLength(500)
                    .HasColumnName("pgDescription");

                entity.Property(e => e.PgName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("pgName");

                entity.Property(e => e.UserId).HasColumnName("userID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.PrivateGroups)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrivateGroups_Users");
            });

            modelBuilder.Entity<PrivateGroupMember>(entity =>
            {
                entity.HasKey(e => new { e.PgId, e.UserId });

                entity.Property(e => e.PgId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("pgID");

                entity.Property(e => e.UserId).HasColumnName("userID");

                entity.Property(e => e.DateOfJoining).HasColumnType("date");

                entity.HasOne(d => d.Pg)
                    .WithMany(p => p.PrivateGroupMembers)
                    .HasForeignKey(d => d.PgId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrivateGroupMembers_PrivateGroups");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.PrivateGroupMembers)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrivateGroupMembers_Users");
            });

            modelBuilder.Entity<PublicPost>(entity =>
            {
                entity.HasKey(e => e.PostId)
                    .HasName("PK_PublicPost_1");

                entity.ToTable("PublicPost");

                entity.Property(e => e.PostId).HasColumnName("postID");

                entity.Property(e => e.PgId).HasColumnName("pgID");

                entity.Property(e => e.PhotoFileName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.PostDesc)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("postDesc");

                entity.Property(e => e.PostName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("postName");

                entity.Property(e => e.ReplyTo).HasColumnName("replyTo");

                entity.Property(e => e.SubjectId).HasColumnName("subjectID");

                entity.Property(e => e.UserId).HasColumnName("userID");

                entity.HasOne(d => d.Pg)
                    .WithMany(p => p.PublicPosts)
                    .HasForeignKey(d => d.PgId)
                    .HasConstraintName("FK_PublicPost_PrivateGroups");

                entity.HasOne(d => d.ReplyToNavigation)
                    .WithMany(p => p.InverseReplyToNavigation)
                    .HasForeignKey(d => d.ReplyTo)
                    .HasConstraintName("FK_PublicPost_PublicPost");

                entity.HasOne(d => d.Subject)
                    .WithMany(p => p.PublicPosts)
                    .HasForeignKey(d => d.SubjectId)
                    .HasConstraintName("FK_PublicPost_Subjects");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.PublicPosts)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PublicPost_Users");
            });

            modelBuilder.Entity<Staff>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.ToTable("Staff");

                entity.Property(e => e.UserId)
                    .ValueGeneratedNever()
                    .HasColumnName("userID");

                entity.Property(e => e.StaffPosition)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("staffPosition");

                entity.HasOne(d => d.User)
                    .WithOne(p => p.Staff)
                    .HasForeignKey<Staff>(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Staff_Users");
            });

            modelBuilder.Entity<Subject>(entity =>
            {
                entity.Property(e => e.SubjectId).HasColumnName("subjectID");

                entity.Property(e => e.DepartmentId).HasColumnName("departmentID");

                entity.Property(e => e.IsActive)
                    .HasColumnName("isActive")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.SubjectCode)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("subjectCode");

                entity.Property(e => e.SubjectDescription)
                    .HasMaxLength(50)
                    .HasColumnName("subjectDescription");

                entity.Property(e => e.SubjectEcts).HasColumnName("subjectECTS");

                entity.Property(e => e.SubjectName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("subjectName");

                entity.Property(e => e.SubjectSemester).HasColumnName("subjectSemester");

                entity.HasOne(d => d.Department)
                    .WithMany(p => p.Subjects)
                    .HasForeignKey(d => d.DepartmentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Subjects_Departments");
            });

            modelBuilder.Entity<Tag>(entity =>
            {
                entity.HasKey(e => e.TagName);

                entity.Property(e => e.TagName)
                    .HasMaxLength(50)
                    .HasColumnName("tagName");
            });

            modelBuilder.Entity<TagsPost>(entity =>
            {
                entity.HasKey(e => new { e.TagName, e.PostId })
                    .HasName("PK__Tags_Pos__955CFF6B46C3BB70");

                entity.ToTable("Tags_Posts");

                entity.Property(e => e.TagName)
                    .HasMaxLength(50)
                    .HasColumnName("tagName");

                entity.Property(e => e.PostId).HasColumnName("postID");

                entity.HasOne(d => d.Post)
                    .WithMany(p => p.TagsPosts)
                    .HasForeignKey(d => d.PostId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Tags_Posts_PublicPost");

                entity.HasOne(d => d.TagNameNavigation)
                    .WithMany(p => p.TagsPosts)
                    .HasForeignKey(d => d.TagName)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Tags_Posts_Tags");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.UserId)
                    .ValueGeneratedNever()
                    .HasColumnName("userID");

                entity.Property(e => e.UserDepartment).HasColumnName("userDepartment");

                entity.Property(e => e.UserDescription)
                    .HasMaxLength(500)
                    .HasColumnName("userDescription");

                entity.Property(e => e.UserEmail)
                    .IsRequired()
                    .HasMaxLength(250)
                    .HasColumnName("userEmail");

                entity.Property(e => e.UserFirstName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("userFirstName");

                entity.Property(e => e.UserLastName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("userLastName");

                entity.Property(e => e.UserPassword)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("userPassword");

                entity.Property(e => e.UserPhotoFileName)
                    .HasMaxLength(500)
                    .HasColumnName("userPhotoFileName");

                entity.Property(e => e.UserRole)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("userRole");

                entity.HasOne(d => d.UserDepartmentNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.UserDepartment)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Users_Departments");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
