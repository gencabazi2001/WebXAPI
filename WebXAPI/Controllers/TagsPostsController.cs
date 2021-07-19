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
    public class TagsPostsController : ControllerBase
    {
        private readonly MPID3828295Context _context;

        public TagsPostsController(MPID3828295Context context)
        {
            _context = context;
        }

        // GET: api/TagsPosts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TagsPost>>> GetTagsPosts()
        {
            return await _context.TagsPosts.ToListAsync();
        }

        // GET: api/TagsPosts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TagsPost>> GetTagsPost(string id)
        {
            var tagsPost = await _context.TagsPosts.FindAsync(id);

            if (tagsPost == null)
            {
                return NotFound();
            }

            return tagsPost;
        }

        // PUT: api/TagsPosts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTagsPost(string id, TagsPost tagsPost)
        {
            if (id != tagsPost.TagName)
            {
                return BadRequest();
            }

            _context.Entry(tagsPost).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TagsPostExists(id))
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

        // POST: api/TagsPosts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TagsPost>> PostTagsPost(TagsPost tagsPost)
        {
            _context.TagsPosts.Add(tagsPost);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TagsPostExists(tagsPost.TagName))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTagsPost", new { id = tagsPost.TagName }, tagsPost);
        }
        
        [HttpDelete("{id}/{postId}")]
        public async Task<IActionResult> DeletePostVote(string id, int postId)
        {
            var tagsPost = await _context.TagsPosts.FindAsync(id, postId);
            if (tagsPost == null)
            {
                return NotFound();
            }

            _context.TagsPosts.Remove(tagsPost);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/TagsPosts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTagsPost(string id)
        {
            var tagsPost = await _context.TagsPosts.FindAsync(id);
            if (tagsPost == null)
            {
                return NotFound();
            }

            _context.TagsPosts.Remove(tagsPost);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TagsPostExists(string id)
        {
            return _context.TagsPosts.Any(e => e.TagName == id);
        }
    }
}
