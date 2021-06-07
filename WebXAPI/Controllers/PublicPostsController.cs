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
    public class PublicPostsController : ControllerBase
    {
        private readonly MPID3828295Context _context;

        public PublicPostsController(MPID3828295Context context)
        {
            _context = context;
        }

        // GET: api/PublicPosts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PublicPost>>> GetPublicPosts()
        {
            return await _context.PublicPosts.ToListAsync();
        }

        // GET: api/PublicPosts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PublicPost>> GetPublicPost(int id)
        {
            var publicPost = await _context.PublicPosts.FindAsync(id);

            if (publicPost == null)
            {
                return NotFound();
            }

            return publicPost;
        }

        // PUT: api/PublicPosts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPublicPost(int id, PublicPost publicPost)
        {
            if (id != publicPost.PostId)
            {
                return BadRequest();
            }

            _context.Entry(publicPost).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PublicPostExists(id))
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

        // POST: api/PublicPosts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PublicPost>> PostPublicPost(PublicPost publicPost)
        {
            _context.PublicPosts.Add(publicPost);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPublicPost", new { id = publicPost.PostId }, publicPost);
        }

        // DELETE: api/PublicPosts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePublicPost(int id)
        {
            var publicPost = await _context.PublicPosts.FindAsync(id);
            if (publicPost == null)
            {
                return NotFound();
            }

            _context.PublicPosts.Remove(publicPost);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PublicPostExists(int id)
        {
            return _context.PublicPosts.Any(e => e.PostId == id);
        }
    }
}
