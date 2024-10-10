namespace AracTakip.Application.Abstractions.Hubs
{
    public interface ICarTypeHubService
    {
        Task CarTypeAddedMessageAsync(string message);
    }
}
