using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Ot.SampleVerificationTracker.Common.Dtos;
using Ot.SampleVerificationTracker.Common.Models;
using Ot.SampleVerificationTracker.Common.Repositories;

namespace Ot.SampleVerificationTracker.Common.Services;

public class ProductVerificationService(IProductSampleRepository repository, IMapper mapper) : IProductVerificationService
{
    public async Task<bool> AddProductSample(CreateProductSampleDto productSampleDto)
    {
        var sample = mapper.Map<ProductSample>(productSampleDto);
        return await repository.Create([sample]);
    }

    public async Task<IList<ProductSampleResponseDto>> GetAllProductSamples()
    {
        var samples = await repository.GetAll();
        return samples.Select(mapper.Map<ProductSampleResponseDto>).ToList();
    }
}