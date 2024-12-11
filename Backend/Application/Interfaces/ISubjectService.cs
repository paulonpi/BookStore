using BookStore.Application.DTOs;

namespace BookStore.Application.Interfaces;

public interface ISubjectService
{
    Task<List<SubjectDto>> GetAllAsync();
    Task<SubjectDto?> GetByIdAsync(int id);
    Task AddAsync(SubjectDto subjectDto);
    Task UpdateAsync(SubjectDto subjectDto);
    Task DeleteAsync(int id);
}