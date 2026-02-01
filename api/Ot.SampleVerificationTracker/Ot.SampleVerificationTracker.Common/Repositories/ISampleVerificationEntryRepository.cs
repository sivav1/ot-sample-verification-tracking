using System.Collections.Generic;
using System.Threading.Tasks;
using Ot.SampleVerificationTracker.Common.Models;

namespace Ot.SampleVerificationTracker.Common.Repositories;

public interface ISampleVerificationEntryRepository
{
    Task<bool> Create(IList<ProductSample> productSamples);
    Task<IList<ProductSample>> GetAll();
}