using Ot.SampleVerificationTracker.Common.Models;

namespace Ot.SampleVerificationTracker.Common.Repositories;

public interface IProductSampleRepository
{
    Task<bool> Create(IList<ProductSample> productSamples);
    Task<IList<ProductSample>> GetAll();
}