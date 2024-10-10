using AracTakip.Application.Abstractions.Hubs;
using AracTakip.SignalR.HubServices;
using Microsoft.Extensions.DependencyInjection;

namespace AracTakip.SignalR
{
    public static class ServiceRegistration
    {
        public static void AddSignalRServices(this IServiceCollection collection)
        {
            collection.AddTransient<ICompanyHubService, CompanyHubService>();
            collection.AddTransient<ICarBrandHubService, CarBrandHubService>();
            collection.AddTransient<ICarEngineTypeHubService, CarEngineTypeHubService>();
            collection.AddTransient<ICarModelHubService, CarModelHubService>();
            collection.AddTransient<ICarTypeHubService, CarTypeHubService>();
            collection.AddTransient<ILocationHubService, LocationHubService>();
            collection.AddTransient<ICarHubService, CarHubService>();
            collection.AddTransient<ICarReservationHubService, CarReservationHubService>();
            collection.AddSignalR();
        }
    }
}
