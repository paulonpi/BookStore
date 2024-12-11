﻿namespace BookStore.Application.DTOs;

public class BookDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int SubjectId { get; set; }
    public List<int> AuthorIds { get; set; } = new();
}