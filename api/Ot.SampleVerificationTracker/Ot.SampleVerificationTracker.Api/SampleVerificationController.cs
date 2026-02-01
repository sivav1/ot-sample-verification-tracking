using Microsoft.AspNetCore.Mvc;
using Ot.SampleVerificationTracker.Common.Dtos;
using Ot.SampleVerificationTracker.Common.Services;

namespace Ot.PSampleVerificationTracker.Api;

[ApiController]
[Route("api/[controller]")]
public class SampleVerificationController(IProductVerificationService service, ILogger<SampleVerificationController> logger) : Controller
{

    [HttpPost]
    public async Task<IActionResult> AddProductSample(CreateProductSampleDto createProductSampleDto)
    {
        logger.LogInformation("call: AddProductSample");
        return Ok(await service.AddProductSample(createProductSampleDto));
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        logger.LogInformation("call: Get all products");
        return Ok(await service.GetAllProductSamples());
    }
}