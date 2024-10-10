namespace AracTakip.Application.Abstractions.Hubs
{
    public interface ICarModelHubService
    {
        Task CarModelAddedMessageAsync(string message);
    }
}
