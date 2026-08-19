using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Microsoft.Azure.Cosmos;

namespace AzureResume.Backend.Api;

public class GetCounter
{
    private readonly ICosmosDbService _cosmosDbService;
    private readonly ILogger<GetCounter> _logger;

    public GetCounter(ILogger<GetCounter> logger, ICosmosDbService cosmosDbService)
    {
        _logger = logger;
        _cosmosDbService = cosmosDbService;
    }

    [Function("GetCounter")]
    public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Function, "get", "post")] HttpRequest req)
    {   
        var id = "1";
        var pk = "1";     
        var incrementOperation = new List<PatchOperation>
        {
            PatchOperation.Increment("/count", 1)
        };
        try
        {
            var counter = await _cosmosDbService.PatchItemAsync<Counter>(id, pk, incrementOperation);
            if (counter == null)
            {
                _logger.LogError("Counter item not found.");
                var fallback = new Counter { Id = id, Count = 1 };
                await _cosmosDbService.UpsertItemAsync(fallback, pk);
                return new ObjectResult(fallback);
            }
            return new ObjectResult(counter);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while incrementing the counter.");
            throw;   
        }
    }
}