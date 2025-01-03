﻿using System.ComponentModel.DataAnnotations;

namespace BookStore.Domain.Entities;

public abstract class BaseEntity
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime? UpdatedAt { get; set; }
}