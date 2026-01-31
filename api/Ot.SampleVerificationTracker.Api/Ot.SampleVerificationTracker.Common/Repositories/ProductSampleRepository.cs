using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Ot.SampleVerificationTracker.Common.Models;

namespace Ot.SampleVerificationTracker.Common.Repositories;

public class ProductSampleRepository(InMemoryDbContext context) : IProductSampleRepository
{
    public async Task<bool> Create(IList<ProductSample> productSamples)
    {
        await context.ProductSamples.AddRangeAsync(productSamples);
        var result = await context.SaveChangesAsync();
        return result == productSamples.Count;
    }

    public async Task<IList<ProductSample>> GetAll()
    {
        var samples = await context.ProductSamples.ToListAsync();
        return samples;
    }
}