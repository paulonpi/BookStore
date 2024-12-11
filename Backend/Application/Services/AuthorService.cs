using BookStore.Application.DTOs;
using BookStore.Application.Interfaces;
using BookStore.Domain.Entities;
using BookStore.Persistence.Interfaces;

namespace BookStore.Application.Services;

public class AuthorService : IAuthorService
{
    private readonly IRepository<Author> _authorRepository;

    public AuthorService(IRepository<Author> authorRepository)
    {
        _authorRepository = authorRepository;
    }

    public async Task<List<AuthorDto>> GetAllAsync()
    {
        var authors = await _authorRepository.GetAllAsync();
        return authors.Select(author => new AuthorDto
        {
            Id = author.Id,
            Name = author.Name
        }).ToList();
    }

    public async Task<AuthorDto?> GetByIdAsync(int id)
    {
        var author = await _authorRepository.GetByIdAsync(id);
        if (author == null) return null;

        return new AuthorDto
        {
            Id = author.Id,
            Name = author.Name
        };
    }

    public async Task AddAsync(AuthorDto authorDto)
    {
        var author = new Author
        {
            Name = authorDto.Name
        };

        await _authorRepository.AddAsync(author);
    }

    public async Task UpdateAsync(AuthorDto authorDto)
    {
        var author = await _authorRepository.GetByIdAsync(authorDto.Id);
        if (author == null) throw new KeyNotFoundException("Author not found.");

        author.Name = authorDto.Name;

        await _authorRepository.UpdateAsync(author);
    }

    public async Task DeleteAsync(int id)
    {
        await _authorRepository.DeleteAsync(id);
    }
}