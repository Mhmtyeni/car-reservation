using AracTakip.Application.Abstractions.Hubs;
using AracTakip.SignalR.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace AracTakip.SignalR.HubServices
{
    public class LocationHubService : ILocationHubService
    {
        readonly IHubContext<LocationHub> _hubContext;

        public LocationHubService(IHubContext<LocationHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task LocationAddedMessageAsync(string message)
        {
            await _hubContext.Clients.All.SendAsync(ReceiveFunctionNames.LocationAddedMessage, message);
        }
    }
}
