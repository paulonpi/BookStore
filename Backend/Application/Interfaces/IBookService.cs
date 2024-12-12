using BookStore.Application.DTOs;

namespace BookStore.Application.Interfaces;

public interface IBookService
{
    Task<List<BookDto>> GetAllAsync();
    Task<BookDto?> GetByIdAsync(int id);
    Task AddAsync(BookDto bookDto);
    Task UpdateAsync(BookDto bookDto);
    Task DeleteAsync(int id);
    Task<(List<BookDto> Books, int TotalCount)> GetPaginatedAsync(int pageNumber, int pageSize);
}