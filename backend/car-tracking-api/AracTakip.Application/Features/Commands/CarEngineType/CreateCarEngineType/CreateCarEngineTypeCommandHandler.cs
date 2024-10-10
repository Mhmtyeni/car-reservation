using AracTakip.Application.Abstractions.Hubs;
using AracTakip.Application.Repositories.CarEngineType;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Commands.CarEngineType.CreateCarEngineType
{
    public class CreateCarEngineTypeCommandHandler : IRequestHandler<CreateCarEngineTypeCommandRequest, CreateCarEngineTypeCommandResponse>
    {
        readonly ICarEngineTypeWriteRepository _carEngineTypeWriteRepository;
        readonly ICarEngineTypeHubService _carEngineTypeHubService;
        readonly ILogger<CreateCarEngineTypeCommandHandler> _logger;

        public CreateCarEngineTypeCommandHandler(ICarEngineTypeWriteRepository carEngineTypeWriteRepository, ICarEngineTypeHubService carEngineTypeHubService, ILogger<CreateCarEngineTypeCommandHandler> logger)
        {
            _carEngineTypeWriteRepository = carEngineTypeWriteRepository;
            _carEngineTypeHubService = carEngineTypeHubService;
            _logger = logger;
        }

        public async Task<CreateCarEngineTypeCommandResponse> Handle(CreateCarEngineTypeCommandRequest request, CancellationToken cancellationToken)
        {
            await _carEngineTypeWriteRepository.AddAsync(new()
            {
                CarEngineTypeName = request.CarEngineTypeName,
                CreatedDate = DateTime.UtcNow,
                ModifiedDate = DateTime.UtcNow,
                IsActive = true,
                IsDeleted = false
            });
            await _carEngineTypeWriteRepository.SaveAsync();
            await _carEngineTypeHubService.CarEngineTypeAddedMessageAsync($"{request.CarEngineTypeName} isiminde motor tipi eklenmiştir.");
            _logger.LogInformation("Araba motor tipi eklendi...");
            return new();
        }
    }
}
