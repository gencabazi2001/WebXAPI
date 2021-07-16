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
    public class AnkesatController : ControllerBase
    {
        private readonly MPID3828295Context _context;

        public AnkesatController(MPID3828295Context context)
        {
            _context = context;
        }

        // GET: api/Ankesat
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ankesat>>> GetAnkesat()
        {
            return await _context.Ankesat
                 .Include(us => us.AnkesaUserNavigation)
                 .ToListAsync();
        }

        // GET: api/Ankesat/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ankesat>> GetAnkesat(int id)
        {
            var ankesat = await _context.Ankesat.FindAsync(id);

            if (ankesat == null)
            {
                return NotFound();
            }

            return ankesat;
        }

        [HttpGet("user/{id}")]
        public async Task<ActionResult<List<Ankesat>>> GetAnkesatFromUser(int id)
        {
            var ankesat = await _context.Ankesat.Where(s => s.UserId == id)
                .Include(us => us.AnkesaUserNavigation)
                .ToListAsync(); ;

            if (ankesat == null)
            {
                return NotFound();
            }

            return ankesat;
            /*
             *   var userPosts = await _context.PublicPosts
             .Where(s => s.UserId == id).ToListAsync();
            if (userPosts == null)
            {
                return NotFound();
            }
       
            return userPosts;
             */
        }

        // PUT: api/Ankesat/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnkesat(int id, Ankesat ankesat)
        {
            if (id != ankesat.Id)
            {
                return BadRequest();
            }

            _context.Entry(ankesat).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnkesatExists(id))
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

        // POST: api/Ankesat
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Ankesat>> PostAnkesat(Ankesat ankesat)
        {
            _context.Ankesat.Add(ankesat);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAnkesat", new { id = ankesat.Id }, ankesat);
        }

        // DELETE: api/Ankesat/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnkesat(int id)
        {
            var ankesat = await _context.Ankesat.FindAsync(id);
            if (ankesat == null)
            {
                return NotFound();
            }

            _context.Ankesat.Remove(ankesat);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AnkesatExists(int id)
        {
            return _context.Ankesat.Any(e => e.Id == id);
        }
    }
}
