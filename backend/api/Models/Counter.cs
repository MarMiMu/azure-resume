using System.Text.Json.Serialization;

public class Counter
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;
    [JsonPropertyName("count")]
    public int Count { get; set; }
}