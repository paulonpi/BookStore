using System.ComponentModel.DataAnnotations;

namespace BookStore.Domain.Entities;

public class Author : BaseEntity
{
    [Required]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;
    
    public ICollection<Book> Books { get; set; } = new List<Book>();
}