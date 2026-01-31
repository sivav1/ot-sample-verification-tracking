using Microsoft.EntityFrameworkCore;
using Ot.SampleVerificationTracker.Common;
using Ot.SampleVerificationTracker.Common.Middleware;
using Ot.SampleVerificationTracker.Common.Repositories;
using Ot.SampleVerificationTracker.Common.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<InMemoryDbContext>(options =>
    options.UseInMemoryDatabase("OtInMemoryDb"));
builder.Services.AddAutoMapper(cfg =>
        cfg.LicenseKey =
            "eyJhbGciOiJSUzI1NiIsImtpZCI6Ikx1Y2t5UGVubnlTb2Z0d2FyZUxpY2Vuc2VLZXkvYmJiMTNhY2I1OTkwNGQ4OWI0Y2IxYzg1ZjA4OGNjZjkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2x1Y2t5cGVubnlzb2Z0d2FyZS5jb20iLCJhdWQiOiJMdWNreVBlbm55U29mdHdhcmUiLCJleHAiOiIxODAxMjY3MjAwIiwiaWF0IjoiMTc2OTc2Mzg4NCIsImFjY291bnRfaWQiOiIwMTljMGUyNTU2OWE3ZTNhYmEzNzc2YzBjMGMwNGM5NiIsImN1c3RvbWVyX2lkIjoiY3RtXzAxa2c3MmJrdzVnd2JidmVnZjZldmNiM2Q1Iiwic3ViX2lkIjoiLSIsImVkaXRpb24iOiIwIiwidHlwZSI6IjIifQ.N71VpHD3gLbMgz4vB0eVLXfrP6GBlim8i-X1mV828Ds3c5jZ5RIzn01EUfWws9Unou_r8_CDX1UFqlIY9nbm58XB2L1XiyZ-u9z2I6EjQ8vUso8jxxNbnGE2sjRR9e8yoPbqaDaBYrQEUpY5WAwrRUmaOxE6_PLa0C5fr1ArPjG8msyIgPa5OEzqQOi1ifF8DvEEHMXu7Q14mekLqWUOvpDmQyls64DSSLZD8t8tVXQ_E42p6kYhluOsTZK4qj92jP1IyVpzt8eCSf5hIC1kNCqt0WlEgdhOxuLyyLcY06Dc4wBSKY61QEqH-8a1G-iZeu9KIjAsp6e5hhrUe2kaug"
    , typeof(MappingProfile));

builder.Services.AddScoped<IProductVerificationService, ProductVerificationService>();
builder.Services.AddScoped<IProductSampleRepository, ProductSampleRepository>();
builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", configurePolicy: policyBuilder =>
    {
        policyBuilder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});
builder.Logging.ClearProviders(); 
builder.Logging.AddConsole(); 

var app = builder.Build();

app.MapOpenApi();
app.MapControllers();
app.UseCors("AllowAllOrigins");
app.UseMiddleware<CorrelationIdMiddleware>();

app.Run();