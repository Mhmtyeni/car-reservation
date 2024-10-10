using AracTakip.Application.Abstractions.Hubs;
using AracTakip.SignalR.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace AracTakip.SignalR.HubServices
{
    public class CarBrandHubService : ICarBrandHubService
    {
        readonly IHubContext<CarBrandHub> _hubContext;

        public CarBrandHubService(IHubContext<CarBrandHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task CarBrandAddedMessageAsync(string message)
        {
            await _hubContext.Clients.All.SendAsync(ReceiveFunctionNames.CarBrandAddedMessage, message);
        }
    }
}
