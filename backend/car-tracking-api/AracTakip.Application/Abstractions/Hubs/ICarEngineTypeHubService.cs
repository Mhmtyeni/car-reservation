namespace AracTakip.Application.Abstractions.Hubs
{
    public interface ICarEngineTypeHubService
    {
        Task CarEngineTypeAddedMessageAsync(string message);
    }
}
