using System;
using Microsoft.EntityFrameworkCore;
using Ot.SampleVerificationTracker.Common.Enums;

namespace Ot.SampleVerificationTracker.Common.Models;

[PrimaryKey("ProductId")]
public class ProductSample
{
    public Guid ProductId = Guid.NewGuid();
    public string ProductName { get; set; }
    public string Origin { get; set; }
    public VerificationStatus VerificationStatus { get; set; }
    public DateTime SubmittedOn { get; set; }
    public string Notes { get; set; }
}