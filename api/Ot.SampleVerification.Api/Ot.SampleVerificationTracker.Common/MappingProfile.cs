using AutoMapper;
using Ot.SampleVerificationTracker.Common.Dtos;
using Ot.SampleVerificationTracker.Common.Models;

namespace Ot.SampleVerificationTracker.Common;

public class MappingProfile:Profile
{
    public MappingProfile()
    {
        CreateMap<CreateProductSampleDto, ProductSample>().ReverseMap();
        CreateMap<ProductSampleResponseDto, ProductSample>().ReverseMap();
    }
}