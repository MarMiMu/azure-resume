using Microsoft.Azure.Cosmos;
using System.Collections.Generic;
using System.Threading.Tasks;
public interface ICosmosDbService
{
    Task<ItemResponse<T>> UpsertItemAsync<T>(T item, string partitionKey);
    Task<T?> GetItemAsync<T>(string id, string partitionKey);
    Task<IEnumerable<T>> QueryItemsAsync<T>(string queryText);
    Task<T?> PatchItemAsync<T>(string id, string partitionKey, List<PatchOperation> patchOperations);
}