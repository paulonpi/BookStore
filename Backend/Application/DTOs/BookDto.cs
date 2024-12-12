namespace BookStore.Application.DTOs;

public class BookDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public SubjectDto Subject { get; set; } = new();
    public List<AuthorDto> Authors { get; set; } = new();
}