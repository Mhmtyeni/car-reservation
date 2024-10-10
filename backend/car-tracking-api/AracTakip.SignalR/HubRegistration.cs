using AracTakip.SignalR.Hubs;
using Microsoft.AspNetCore.Builder;

namespace AracTakip.SignalR
{
    public static class HubRegistration
    {
        public static void MapHubs(this WebApplication webApplication)
        {
            webApplication.MapHub<CompanyHub>("/companies-hub");
            webApplication.MapHub<CarBrandHub>("/carBrands-hub");
            webApplication.MapHub<CarEngineTypeHub>("/carEngineTypes-hub");
            webApplication.MapHub<CarModelHub>("/carModels-hub");
            webApplication.MapHub<CarTypeHub>("/carTypes-hub");;
            webApplication.MapHub<LocationHub>("/location-hub");;
            webApplication.MapHub<CarHub>("/car-hub");;
            webApplication.MapHub<CarReservationHub>("/carReservations-hub");;
        }
    }
}
