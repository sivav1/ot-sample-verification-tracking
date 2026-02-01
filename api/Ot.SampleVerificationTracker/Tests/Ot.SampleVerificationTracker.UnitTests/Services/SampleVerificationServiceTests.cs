using AutoMapper;
using Microsoft.Extensions.Logging;
using NSubstitute;
using Ot.SampleVerificationTracker.Common.Dtos;
using Ot.SampleVerificationTracker.Common.Models;
using Ot.SampleVerificationTracker.Common.Repositories;
using Ot.SampleVerificationTracker.Common.Services;

namespace Ot.SampleVerificationTracker.UnitTests.Services;

public class SampleVerificationEntryServiceTests
{
    
    private readonly ISampleVerificationEntryRepository _mockRepo;
    private ISampleVerificationEntryService _entryService;
    private readonly IMapper _mockMapper;
    private readonly ILogger<SampleVerificationEntryService> _mockLogger;


    public SampleVerificationEntryServiceTests()
    {
        _mockRepo = Substitute.For<ISampleVerificationEntryRepository>();
        _mockMapper = Substitute.For<IMapper>();
        _mockLogger = Substitute.For<ILogger<SampleVerificationEntryService>>();
    }
    
    // 1. Arrange: Create the mock and the service

    [Test]
    public void Test_AddProductSample_Returns_True_If_Success()
    {
        _mockRepo.Create(Arg.Any<List<ProductSample>>()).Returns(true);
        _entryService = new SampleVerificationEntryService(_mockRepo, _mockMapper, _mockLogger);

        Assert.ThatAsync(() => _entryService.AddProductSample(new CreateProductSampleDto()), Is.True);
    }
}