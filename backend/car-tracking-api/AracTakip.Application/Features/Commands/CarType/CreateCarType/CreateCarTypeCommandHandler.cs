using AracTakip.Application.Abstractions.Hubs;
using AracTakip.Application.Repositories.CarType;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Commands.CarType.CreateCarType
{
    public class CreateCarTypeCommandHandler : IRequestHandler<CreateCarTypeCommandRequest, CreateCarTypeCommandResponse>
    {
        readonly ICarTypeWriteRepository _carTypeWriteRepository;
        readonly ICarTypeHubService _carTypeHubService;
        readonly ILogger<CreateCarTypeCommandHandler> _logger;

        public CreateCarTypeCommandHandler(ICarTypeWriteRepository carTypeWriteRepository, ICarTypeHubService carTypeHubService, ILogger<CreateCarTypeCommandHandler> logger)
        {
            _carTypeWriteRepository = carTypeWriteRepository;
            _carTypeHubService = carTypeHubService;
            _logger = logger;
        }

        public async Task<CreateCarTypeCommandResponse> Handle(CreateCarTypeCommandRequest request, CancellationToken cancellationToken)
        {
            await _carTypeWriteRepository.AddAsync(new()
            {
                CarTypeName = request.CarTypeName,
                CreatedDate = DateTime.UtcNow,
                ModifiedDate = DateTime.UtcNow,
                IsActive = true,
                IsDeleted = false
            });
            await _carTypeWriteRepository.SaveAsync();
            await _carTypeHubService.CarTypeAddedMessageAsync($"{request.CarTypeName} isminde tip eklenmiştir.");
            _logger.LogInformation("Araba tipi eklendi...");
            return new();
        }
    }
}
