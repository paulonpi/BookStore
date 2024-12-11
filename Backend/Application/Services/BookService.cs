using BookStore.Application.DTOs;
using BookStore.Application.Interfaces;
using BookStore.Domain.Entities;
using BookStore.Persistence.Interfaces;

namespace BookStore.Application.Services;

public class BookService : IBookService
{
    private readonly IRepository<Book> _bookRepository;
    private readonly IRepository<Author> _authorRepository;

    public BookService(IRepository<Book> bookRepository, IRepository<Author> authorRepository)
    {
        _bookRepository = bookRepository;
        _authorRepository = authorRepository;
    }

    public async Task<List<BookDto>> GetAllAsync()
    {
        var books = await _bookRepository.GetAllAsync();
        return books.Select(book => new BookDto
        {
            Id = book.Id,
            Title = book.Title,
            Price = book.Price,
            SubjectId = book.SubjectId,
            AuthorIds = book.Authors.Select(a => a.Id).ToList()
        }).ToList();
    }

    public async Task<BookDto?> GetByIdAsync(int id)
    {
        var book = await _bookRepository.GetByIdAsync(id);
        if (book == null) return null;

        return new BookDto
        {
            Id = book.Id,
            Title = book.Title,
            Price = book.Price,
            SubjectId = book.SubjectId,
            AuthorIds = book.Authors.Select(a => a.Id).ToList()
        };
    }

    public async Task AddAsync(BookDto bookDto)
    {
        var authors = await _authorRepository.GetAllAsync();
        var book = new Book
        {
            Title = bookDto.Title,
            Price = bookDto.Price,
            SubjectId = bookDto.SubjectId,
            Authors = authors.Where(a => bookDto.AuthorIds.Contains(a.Id)).ToList()
        };

        await _bookRepository.AddAsync(book);
    }

    public async Task UpdateAsync(BookDto bookDto)
    {
        var book = await _bookRepository.GetByIdAsync(bookDto.Id);
        if (book == null) throw new KeyNotFoundException("Book not found.");

        var authors = await _authorRepository.GetAllAsync();
        book.Title = bookDto.Title;
        book.Price = bookDto.Price;
        book.SubjectId = bookDto.SubjectId;
        book.Authors = authors.Where(a => bookDto.AuthorIds.Contains(a.Id)).ToList();

        await _bookRepository.UpdateAsync(book);
    }

    public async Task DeleteAsync(int id)
    {
        await _bookRepository.DeleteAsync(id);
    }
}