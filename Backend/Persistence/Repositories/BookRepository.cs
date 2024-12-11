using BookStore.Domain.Entities;
using BookStore.Persistence.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Persistence.Repositories;

public class BookRepository : Repository<Book>, IBookRepository
{
    public BookRepository(AppDbContext context) : base(context) { }

    public async Task<IEnumerable<Book>> GetBooksByAuthorIdAsync(int authorId)
    {
        return await DbSet
            .Include(b => b.Authors)
            .Where(b => b.Authors.Any(a => a.Id == authorId))
            .ToListAsync();
    }
}