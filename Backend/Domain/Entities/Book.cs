using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using BookStore.Domain.Enums;

namespace BookStore.Domain.Entities;

public class Book : BaseEntity
{
    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    [Column(TypeName = "decimal(6, 2)")]
    [Range(0, 9999.99)]
    public decimal Price { get; set; }
    
    [Required]
    public PurchaseType PurchaseType { get; set; }
    
    public ICollection<Author> Authors { get; set; } = new List<Author>();
    
    [Required]
    public Subject Subject { get; set; } = null!;
    
    public int SubjectId { get; set; }
}