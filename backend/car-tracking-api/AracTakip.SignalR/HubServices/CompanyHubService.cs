using AracTakip.Application.Abstractions.Hubs;
using AracTakip.SignalR.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace AracTakip.SignalR.HubServices
{
    public class CompanyHubService : ICompanyHubService
    {
        readonly IHubContext<CompanyHub> _hubContext;

        public CompanyHubService(IHubContext<CompanyHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task CompanyAddedMessageAsync(string message)
        {
            await _hubContext.Clients.All.SendAsync(ReceiveFunctionNames.CompanyAddedMessage, message);
        }
    }
}
