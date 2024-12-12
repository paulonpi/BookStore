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
            Subject = new SubjectDto { Id = book.SubjectId, Name = book.Subject?.Name ?? string.Empty },
            Authors = book.Authors.Select(a => new AuthorDto { Id = a.Id, Name = a.Name }).ToList()
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
            Subject = new SubjectDto { Id = book.SubjectId, Name = book.Subject?.Name ?? string.Empty },
            Authors = book.Authors.Select(a => new AuthorDto { Id = a.Id, Name = a.Name }).ToList()
        };
    }

    public async Task AddAsync(BookDto bookDto)
    {
        var authors = await _authorRepository.GetAllAsync();
        var book = new Book
        {
            Title = bookDto.Title,
            Price = bookDto.Price,
            SubjectId = bookDto.Subject.Id,
            Authors = authors.Where(a => bookDto.Authors.Select(dto => dto.Id).Contains(a.Id)).ToList()
        };

        await _bookRepository.AddAsync(book);
    }

    public async Task UpdateAsync(BookDto bookDto)
    {
        var book = await _bookRepository.GetByIdAsync(bookDto.Id, nameof(Book.Authors));
        if (book == null) throw new KeyNotFoundException("Book not found.");

        // Get all authors and filter in memory
        var allAuthors = await _authorRepository.GetAllAsync();
        var selectedAuthors = allAuthors.Where(a => bookDto.Authors.Select(dto => dto.Id).Contains(a.Id)).ToList();

        book.Title = bookDto.Title;
        book.Price = bookDto.Price;
        book.SubjectId = bookDto.Subject.Id;
        
        // Remove authors that are no longer selected
        book.Authors.ToList().RemoveAll(author => !selectedAuthors.Contains(author));

        // Add new authors that weren't previously included
        foreach (var author in selectedAuthors.Where(author => !book.Authors.Contains(author)))
        {
            book.Authors.Add(author);
        }

        await _bookRepository.UpdateAsync(book);
    }

    public async Task DeleteAsync(int id)
    {
        await _bookRepository.DeleteAsync(id);
    }

    public async Task<(List<BookDto> Books, int TotalCount)> GetPaginatedAsync(int pageNumber, int pageSize)
    {
        var (books, totalCount) = await _bookRepository.GetPaginatedAsync(
            pageNumber,
            pageSize,
            includeProperties: "Subject,Authors",
            orderBy: query => query.OrderBy(b => b.Title)
        );
        
        var bookDtos = books.Select(book => new BookDto
        {
            Id = book.Id,
            Title = book.Title,
            Price = book.Price,
            Subject = new SubjectDto 
            { 
                Id = book.SubjectId, 
                Name = book.Subject?.Name ?? string.Empty 
            },
            Authors = book.Authors.Select(a => new AuthorDto 
            { 
                Id = a.Id, 
                Name = a.Name 
            }).ToList()
        }).ToList();

        return (bookDtos, totalCount);
    }
}