using Microsoft.Azure.Cosmos;

public class CosmosDbService : ICosmosDbService
{
    private readonly Container _container;

    public CosmosDbService(CosmosClient cosmosClient)
    {
        var databaseName = Environment.GetEnvironmentVariable("CosmosDb__DatabaseName");
        var containerName = Environment.GetEnvironmentVariable("CosmosDb__ContainerName");

        _container = cosmosClient.GetContainer(databaseName, containerName);
    }

    public async Task<ItemResponse<T>> UpsertItemAsync<T>(T item, string partitionKey)
    {
        return await _container.UpsertItemAsync(item, new PartitionKey(partitionKey));
    }

    public async Task<T?> GetItemAsync<T>(string id, string partitionKey)
    {
        try
        {
            var response = await _container.ReadItemAsync<T>(id, new PartitionKey(partitionKey));
            return response.Resource;
        }
        catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
        {
            return default;
        }
    }

    public async Task<IEnumerable<T>> QueryItemsAsync<T>(string queryText)
    {
        var query = _container.GetItemQueryIterator<T>(new QueryDefinition(queryText));
        var results = new List<T>();

        while (query.HasMoreResults)
        {
            var response = await query.ReadNextAsync();
            results.AddRange(response);
        }

        return results;
    }

    public async Task<T?> PatchItemAsync<T>(string id, string partitionKey, List<PatchOperation> patchOperations)
    {
        try
        {
            var response = await _container.PatchItemAsync<T>(id, new PartitionKey(partitionKey), patchOperations);
            return response.Resource;
        }
        catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
        {
            return default;
        }
    }
}