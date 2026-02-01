using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Ot.SampleVerificationTracker.Common.Middleware;

// The correlation id can be used to track requests from the consumer for traceability. 
public class CorrelationIdMiddleware(RequestDelegate next)
{
    private const string HeaderKey = "X-Correlation-ID";

    public async Task InvokeAsync(HttpContext context, ILogger<CorrelationIdMiddleware> logger)
    {
        if (!context.Request.Headers.TryGetValue(HeaderKey, out var correlationId))
        {
            correlationId = Guid.NewGuid().ToString();
        }

        // The logger is added with scope so that the correlation id is logged allover the app
        using (logger.BeginScope(new Dictionary<string, object> { ["CorrelationId"] = correlationId.ToString() }))
        {
            context.Response.Headers.Append(HeaderKey, correlationId);

            await next(context);
        }
    }
}

