using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebXAPI.Models;

namespace WebXAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly MPID3828295Context _context;
        public static IWebHostEnvironment _environment;
        public UsersController(MPID3828295Context context,IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }
        // GET: api/Users/GetUserDetails/1



        [HttpGet("userdetails")]
        [Authorize]
        public async Task<ActionResult<User>> GetUserDetails()
        {

            string Uid = User.Claims.First(c => c.Type == "UserId").Value;
            int id = Int32.Parse(Uid);

            var user = await _context.Users
                                .Include(us => us.UserDepartmentNavigation)
                                    .ThenInclude(dep => dep.Subjects)
                                .Include(us => us.Staff)
                                .Include(us => us.GroupMembers)
                                .Include(us => us.PostVotes)
                                .Include(us => us.PrivateGroupMembers)
                                .Include(us => us.PrivateGroups)
                                .Include(us => us.PublicPosts)
                                    .ThenInclude(pub => pub.Subject)
                                .Where(us => us.UserId == id)
                                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }




        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

    


        [HttpPost("login")]
        public async Task<ActionResult> Login(User user)
        { var email = user.UserEmail;
            var u = await _context.Users
                                .Where(us => us.UserEmail == email)
                                .FirstOrDefaultAsync();
            if (u != null && (u.UserPassword == user.UserPassword))
            {
                var tokenDescriptior = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[] {
                new Claim("UserId",u.UserId.ToString())
            }),
                    Expires = DateTime.UtcNow.AddMinutes(60),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("1234567890123456")),
                    SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptior);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }
            else return BadRequest(new { message = "Username or passwrord is incorrect" });
            
        }

      

        [HttpPost("profilepic/{id}"),DisableRequestSizeLimit]
   
        public async Task<IActionResult> PostUserProfilePic(int id)
        {
            var user = await _context.Users.FindAsync(id);

            try
            {
                var file =  Request.Form.Files[0];
                var folderName =  "Images";
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0) {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                         file.CopyTo(stream);
                    }


                    user.UserPhotoFileName = dbPath;
                    _context.SaveChanges();

                    return Ok(new { user });
                }else
                {
                    return BadRequest();
                }
            }
            catch(Exception e) {
                return StatusCode(500, $"Internal server error: {e}");
            }

     

        }



        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
          
            if (id != user.UserId)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.Users.Add(user);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserExists(user.UserId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUser", new { id = user.UserId }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
    }
}
