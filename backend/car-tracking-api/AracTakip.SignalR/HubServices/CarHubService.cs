using AracTakip.Application.Abstractions.Hubs;
using AracTakip.SignalR.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace AracTakip.SignalR.HubServices
{
    public class CarHubService : ICarHubService
    {
        readonly IHubContext<CarHub> _hubContext;

        public CarHubService(IHubContext<CarHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task CarAddedMessageAsync(string message)
        {
            await _hubContext.Clients.All.SendAsync(ReceiveFunctionNames.CarAddedMessage, message);
        }
    }
}
