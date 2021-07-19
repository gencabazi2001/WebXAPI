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
    public class PostVotesController : ControllerBase
    {
        private readonly MPID3828295Context _context;

        public PostVotesController(MPID3828295Context context)
        {
            _context = context;
        }

        // GET: api/PostVotes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostVote>>> GetPostVotes()
        {
            return await _context.PostVotes.ToListAsync();
        }

        // GET: api/PostVotes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PostVote>> GetPostVote(int id)
        {
            var postVote = await _context.PostVotes.FindAsync(id);

            if (postVote == null)
            {
                return NotFound();
            }

            return postVote;
        }

        // PUT: api/PostVotes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPostVote(int id, PostVote postVote)
        {
            if (id != postVote.PostId)
            {
                return BadRequest();
            }

            _context.Entry(postVote).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostVoteExists(id))
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

        // POST: api/PostVotes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PostVote>> PostPostVote(PostVote postVote)
        {
            _context.PostVotes.Add(postVote);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PostVoteExists(postVote.PostId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPostVote", new { id = postVote.PostId }, postVote);
        }

        // DELETE: api/PostVotes/5
        [HttpDelete("{id}/{userId}")]
        public async Task<IActionResult> DeletePostVote(int id, int userId)
        {
            var postVote = await _context.PostVotes.FindAsync(id, userId);
            if (postVote == null)
            {
                return NotFound();
            }

            _context.PostVotes.Remove(postVote);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PostVoteExists(int id)
        {
            return _context.PostVotes.Any(e => e.PostId == id);
        }
    }
}
