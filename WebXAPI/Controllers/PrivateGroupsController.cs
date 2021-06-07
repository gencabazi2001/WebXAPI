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
    public class PrivateGroupsController : ControllerBase
    {
        private readonly MPID3828295Context _context;

        public PrivateGroupsController(MPID3828295Context context)
        {
            _context = context;
        }

        // GET: api/PrivateGroups
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PrivateGroup>>> GetPrivateGroups()
        {
            return await _context.PrivateGroups.ToListAsync();
        }

        // GET: api/PrivateGroups/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PrivateGroup>> GetPrivateGroup(int id)
        {
            var privateGroup = await _context.PrivateGroups.FindAsync(id);

            if (privateGroup == null)
            {
                return NotFound();
            }

            return privateGroup;
        }

        // PUT: api/PrivateGroups/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPrivateGroup(int id, PrivateGroup privateGroup)
        {
            if (id != privateGroup.PgId)
            {
                return BadRequest();
            }

            _context.Entry(privateGroup).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PrivateGroupExists(id))
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

        // POST: api/PrivateGroups
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PrivateGroup>> PostPrivateGroup(PrivateGroup privateGroup)
        {
            _context.PrivateGroups.Add(privateGroup);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PrivateGroupExists(privateGroup.PgId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPrivateGroup", new { id = privateGroup.PgId }, privateGroup);
        }

        // DELETE: api/PrivateGroups/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePrivateGroup(int id)
        {
            var privateGroup = await _context.PrivateGroups.FindAsync(id);
            if (privateGroup == null)
            {
                return NotFound();
            }

            _context.PrivateGroups.Remove(privateGroup);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PrivateGroupExists(int id)
        {
            return _context.PrivateGroups.Any(e => e.PgId == id);
        }
    }
}
