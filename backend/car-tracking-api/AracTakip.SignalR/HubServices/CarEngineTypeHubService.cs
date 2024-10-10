using AracTakip.Application.Abstractions.Hubs;
using AracTakip.SignalR.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace AracTakip.SignalR.HubServices
{
    public class CarEngineTypeHubService : ICarEngineTypeHubService
    {
        readonly IHubContext<CarEngineTypeHub> _hubContext;

        public CarEngineTypeHubService(IHubContext<CarEngineTypeHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task CarEngineTypeAddedMessageAsync(string message)
        {
            await _hubContext.Clients.All.SendAsync(ReceiveFunctionNames.CarEngineTypeAddedMessage, message);
        }
    }
}
