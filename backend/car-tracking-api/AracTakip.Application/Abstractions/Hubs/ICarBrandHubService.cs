namespace AracTakip.Application.Abstractions.Hubs
{
    public interface ICarBrandHubService
    {
        Task CarBrandAddedMessageAsync(string message);
    }
}
