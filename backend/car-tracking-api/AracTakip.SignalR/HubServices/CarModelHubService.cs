using AracTakip.Application.Abstractions.Hubs;
using AracTakip.SignalR.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace AracTakip.SignalR.HubServices
{
    public class CarModelHubService : ICarModelHubService
    {
        readonly IHubContext<CarModelHub> _hubContext;

        public CarModelHubService(IHubContext<CarModelHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task CarModelAddedMessageAsync(string message)
        {
            await _hubContext.Clients.All.SendAsync(ReceiveFunctionNames.CarModelAddedMessage, message);
        }
    }
}
