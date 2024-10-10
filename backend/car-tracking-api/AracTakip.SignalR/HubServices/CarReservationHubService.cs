using AracTakip.Application.Abstractions.Hubs;
using AracTakip.SignalR.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace AracTakip.SignalR.HubServices
{
    public class CarReservationHubService : ICarReservationHubService
    {
        readonly IHubContext<CarReservationHub> _hubContext;

        public CarReservationHubService(IHubContext<CarReservationHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task CarReservationAddedMessageAsync(string message)
        {
            await _hubContext.Clients.All.SendAsync(ReceiveFunctionNames.CarReservationAddedMessage, message);
        }
    }
}
