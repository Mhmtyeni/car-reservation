namespace AracTakip.Application.Abstractions.Hubs
{
    public interface ICarHubService
    {
        Task CarAddedMessageAsync(string message);
    }
}
