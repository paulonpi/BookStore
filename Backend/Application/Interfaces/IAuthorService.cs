using BookStore.Application.DTOs;

namespace BookStore.Application.Interfaces;

public interface IAuthorService
{
    Task<List<AuthorDto>> GetAllAsync();
    Task<AuthorDto?> GetByIdAsync(int id);
    Task AddAsync(AuthorDto authorDto);
    Task UpdateAsync(AuthorDto authorDto);
    Task DeleteAsync(int id);
}