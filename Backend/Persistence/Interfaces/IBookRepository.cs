using BookStore.Domain.Entities;

namespace BookStore.Persistence.Interfaces;

public interface IBookRepository : IRepository<Book>
{
    Task<IEnumerable<Book>> GetBooksByAuthorIdAsync(int authorId);
}