
using AutoMapper;
using Microsoft.Extensions.Logging;
using Ot.SampleVerificationTracker.Common.Dtos;
using Ot.SampleVerificationTracker.Common.Models;
using Ot.SampleVerificationTracker.Common.Repositories;

namespace Ot.SampleVerificationTracker.Common.Services;

public class SampleVerificationEntryService(ISampleVerificationEntryRepository verificationEntryRepository, IMapper mapper, ILogger<SampleVerificationEntryService> logger) : ISampleVerificationEntryService
{
    public async Task<bool> AddProductSample(CreateProductSampleDto productSampleDto)
    {
        try
        {
            var sample = mapper.Map<ProductSample>(productSampleDto);
            return await verificationEntryRepository.Create([sample]);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, ex.Message);
            throw;
        }
    }

    public async Task<IList<ProductSampleResponseDto>> GetAllProductSamples()
    {
        var samples = await verificationEntryRepository.GetAll();
        return samples.Select(mapper.Map<ProductSampleResponseDto>).ToList();
    }
}