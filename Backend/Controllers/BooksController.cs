using BookStore.Application.DTOs;
using BookStore.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly IBookService _bookService;

    public BooksController(IBookService bookService)
    {
        _bookService = bookService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var books = await _bookService.GetAllAsync();
        return Ok(books);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var book = await _bookService.GetByIdAsync(id);
        if (book == null) return NotFound();

        return Ok(book);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] BookDto bookDto)
    {
        await _bookService.AddAsync(bookDto);
        return CreatedAtAction(nameof(GetById), new { id = bookDto.Id }, bookDto);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] BookDto bookDto)
    {
        if (id != bookDto.Id) return BadRequest();

        await _bookService.UpdateAsync(bookDto);
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _bookService.DeleteAsync(id);
        return NoContent();
    }

    [HttpGet("paginated")]
    public async Task<IActionResult> GetPaginated(int pageNumber = 1, int pageSize = 10)
    {
        var (books, totalCount) = await _bookService.GetPaginatedAsync(pageNumber, pageSize);
        return Ok(new { Books = books, TotalCount = totalCount });
    }
}