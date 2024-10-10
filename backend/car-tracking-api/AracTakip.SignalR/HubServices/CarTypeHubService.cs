using AracTakip.Application.Abstractions.Hubs;
using AracTakip.SignalR.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace AracTakip.SignalR.HubServices
{
    public class CarTypeHubService : ICarTypeHubService
    {
        readonly IHubContext<CarTypeHub> _hubContext;

        public CarTypeHubService(IHubContext<CarTypeHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task CarTypeAddedMessageAsync(string message)
        {
            await _hubContext.Clients.All.SendAsync(ReceiveFunctionNames.CarTypeAddedMessage, message);
        }
    }
}
