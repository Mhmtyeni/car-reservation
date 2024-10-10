namespace AracTakip.Application.Abstractions.Hubs
{
    public interface ICarReservationHubService
    {
        Task CarReservationAddedMessageAsync(string message);
    }
}
