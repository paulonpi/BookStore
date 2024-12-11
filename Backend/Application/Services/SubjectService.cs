﻿using BookStore.Application.DTOs;
using BookStore.Application.Interfaces;
using BookStore.Domain.Entities;
using BookStore.Persistence.Interfaces;

namespace BookStore.Application.Services;

public class SubjectService : ISubjectService
{
    private readonly IRepository<Subject> _subjectRepository;

    public SubjectService(IRepository<Subject> subjectRepository)
    {
        _subjectRepository = subjectRepository;
    }

    public async Task<List<SubjectDto>> GetAllAsync()
    {
        var subjects = await _subjectRepository.GetAllAsync();
        return subjects.Select(subject => new SubjectDto
        {
            Id = subject.Id,
            Name = subject.Name
        }).ToList();
    }

    public async Task<SubjectDto?> GetByIdAsync(int id)
    {
        var subject = await _subjectRepository.GetByIdAsync(id);
        if (subject == null) return null;

        return new SubjectDto
        {
            Id = subject.Id,
            Name = subject.Name
        };
    }

    public async Task AddAsync(SubjectDto subjectDto)
    {
        var subject = new Subject
        {
            Name = subjectDto.Name
        };

        await _subjectRepository.AddAsync(subject);
    }

    public async Task UpdateAsync(SubjectDto subjectDto)
    {
        var subject = await _subjectRepository.GetByIdAsync(subjectDto.Id);
        if (subject == null) throw new KeyNotFoundException("Subject not found.");

        subject.Name = subjectDto.Name;

        await _subjectRepository.UpdateAsync(subject);
    }

    public async Task DeleteAsync(int id)
    {
        await _subjectRepository.DeleteAsync(id);
    }
}