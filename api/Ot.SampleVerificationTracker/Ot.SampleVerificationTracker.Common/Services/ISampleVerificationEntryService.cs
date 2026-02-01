using System.Collections.Generic;
using System.Threading.Tasks;
using Ot.SampleVerificationTracker.Common.Dtos;

namespace Ot.SampleVerificationTracker.Common.Services;

public interface ISampleVerificationEntryService
{
    Task<bool> AddProductSample(CreateProductSampleDto productSampleDto);
    Task<IList<ProductSampleResponseDto>> GetAllProductSamples();
}