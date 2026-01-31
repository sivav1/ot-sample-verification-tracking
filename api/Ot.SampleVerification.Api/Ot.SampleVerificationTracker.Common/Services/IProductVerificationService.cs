using Ot.SampleVerificationTracker.Common.Dtos;

namespace Ot.SampleVerificationTracker.Common.Services;

public interface IProductVerificationService
{
    Task<bool> AddProductSample(CreateProductSampleDto productSampleDto);
    Task<IList<ProductSampleResponseDto>> GetAllProductSamples();
}