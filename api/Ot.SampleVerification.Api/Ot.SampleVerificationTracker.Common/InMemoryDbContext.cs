using Microsoft.EntityFrameworkCore;
using Ot.SampleVerificationTracker.Common.Models;

namespace Ot.SampleVerificationTracker.Common;

public class InMemoryDbContext(DbContextOptions<InMemoryDbContext> options) : DbContext(options)
{
    public DbSet<ProductSample> ProductSamples { get; set; }
}