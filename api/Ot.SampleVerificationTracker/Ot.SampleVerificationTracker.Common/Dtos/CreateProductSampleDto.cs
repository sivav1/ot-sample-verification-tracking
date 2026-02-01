using System;
using System.ComponentModel.DataAnnotations;
using Ot.SampleVerificationTracker.Common.Enums;

namespace Ot.SampleVerificationTracker.Common.Dtos;

public class CreateProductSampleDto
{
    [Required(ErrorMessage = "Product name is required")]
    public string ProductName { get; set; }
    [Required(ErrorMessage = "Product origin is required")]
    public string Origin { get; set; }
    [Required, EnumDataType(typeof(Enums.VerificationStatus))]
    public VerificationStatus VerificationStatus { get; set; }
    [Required, DataType(DataType.Date)]
    public DateTime SubmittedOn { get; set; }
    public string Notes { get; set; }
}