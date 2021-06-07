using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebXAPI.Models;

namespace WebXAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrivateGroupMembersController : ControllerBase
    {
        private readonly MPID3828295Context _context;

        public PrivateGroupMembersController(MPID3828295Context context)
        {
            _context = context;
        }

        // GET: api/PrivateGroupMembers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PrivateGroupMember>>> GetPrivateGroupMembers()
        {
            return await _context.PrivateGroupMembers.ToListAsync();
        }

        // GET: api/PrivateGroupMembers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PrivateGroupMember>> GetPrivateGroupMember(int id)
        {
            var privateGroupMember = await _context.PrivateGroupMembers.FindAsync(id);

            if (privateGroupMember == null)
            {
                return NotFound();
            }

            return privateGroupMember;
        }

        // PUT: api/PrivateGroupMembers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPrivateGroupMember(int id, PrivateGroupMember privateGroupMember)
        {
            if (id != privateGroupMember.PgId)
            {
                return BadRequest();
            }

            _context.Entry(privateGroupMember).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PrivateGroupMemberExists(id))
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

        // POST: api/PrivateGroupMembers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PrivateGroupMember>> PostPrivateGroupMember(PrivateGroupMember privateGroupMember)
        {
            _context.PrivateGroupMembers.Add(privateGroupMember);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPrivateGroupMember", new { id = privateGroupMember.PgId }, privateGroupMember);
        }

        // DELETE: api/PrivateGroupMembers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePrivateGroupMember(int id)
        {
            var privateGroupMember = await _context.PrivateGroupMembers.FindAsync(id);
            if (privateGroupMember == null)
            {
                return NotFound();
            }

            _context.PrivateGroupMembers.Remove(privateGroupMember);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PrivateGroupMemberExists(int id)
        {
            return _context.PrivateGroupMembers.Any(e => e.PgId == id);
        }
    }
}
