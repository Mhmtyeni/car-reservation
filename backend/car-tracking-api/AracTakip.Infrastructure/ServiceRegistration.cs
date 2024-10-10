using AracTakip.Application.Abstractions.Services.Configurations;
using AracTakip.Application.Abstractions.Storage;
using AracTakip.Application.Abstractions.Token;
using AracTakip.Infrastructure.Enums;
using AracTakip.Infrastructure.Services.Configurations;
using AracTakip.Infrastructure.Services.Storage;
using AracTakip.Infrastructure.Services.Storage.Azure;
using AracTakip.Infrastructure.Services.Storage.Local;
using AracTakip.Infrastructure.Services.Token;
using Microsoft.Extensions.DependencyInjection;

namespace AracTakip.Infrastructure
{
    public static class ServiceRegistration
    {
        public static void AddInfrastructureServices(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddScoped<IStorageService, StorageService>();
            serviceCollection.AddScoped<ITokenHandler, TokenHandler>();
            //serviceCollection.AddScoped<IMailService, MailService>();
            serviceCollection.AddScoped<IApplicationService, ApplicationService>();
            //serviceCollection.AddScoped<IQRCodeService, QRCodeService>();
        }
        public static void AddStorage<T>(this IServiceCollection serviceCollection) where T : Storage, IStorage
        {
            serviceCollection.AddScoped<IStorage, T>();
        }
        public static void AddStorage(this IServiceCollection serviceCollection, StorageType storageType)
        {
            switch (storageType)
            {
                case StorageType.Local:
                    serviceCollection.AddScoped<IStorage, LocalStorage>();
                    break;
                case StorageType.Azure:
                    serviceCollection.AddScoped<IStorage, AzureStorage>();
                    break;
                case StorageType.AWS:

                    break;
                default:
                    serviceCollection.AddScoped<IStorage, LocalStorage>();
                    break;
            }
        }
    }
}
