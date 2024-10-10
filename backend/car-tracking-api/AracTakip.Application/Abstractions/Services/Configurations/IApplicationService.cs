using AracTakip.Application.DTOs.Configuration;

namespace AracTakip.Application.Abstractions.Services.Configurations
{
    public interface IApplicationService
    {
        List<Menu> GetAuthorizeDefinitionEndpoints(Type type);
    }
}
