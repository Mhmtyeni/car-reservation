namespace AracTakip.Application.Abstractions.Hubs
{
    public interface ILocationHubService
    {
        Task LocationAddedMessageAsync(string message);
    }
}
