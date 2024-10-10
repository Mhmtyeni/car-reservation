using AracTakip.Application.Abstractions.Hubs;
using AracTakip.Application.Repositories.CarBrand;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Commands.CarBrand.CreateCarBrand
{
    public class CreateCarBrandCommandHandler : IRequestHandler<CreateCarBrandCommandRequest, CreateCarBrandCommandResponse>
    {
        readonly ICarBrandWriteRepository _carBrandWriteRepository;
        readonly ICarBrandHubService _carBrandHubService;
        readonly ILogger<CreateCarBrandCommandHandler> _logger;
        public CreateCarBrandCommandHandler(ICarBrandWriteRepository carBrandWriteRepository, ILogger<CreateCarBrandCommandHandler> logger, ICarBrandHubService carBrandHubService)
        {
            _carBrandWriteRepository = carBrandWriteRepository;
            _logger = logger;
            _carBrandHubService = carBrandHubService;
        }

        public async Task<CreateCarBrandCommandResponse> Handle(CreateCarBrandCommandRequest request, CancellationToken cancellationToken)
        {
            await _carBrandWriteRepository.AddAsync(new()
            {
                CarBrandName = request.CarBrandName,
                CreatedDate = DateTime.UtcNow,
                IsActive = true,
                IsDeleted = false,
                ModifiedDate = DateTime.UtcNow,
            });
            await _carBrandWriteRepository.SaveAsync();
            await _carBrandHubService.CarBrandAddedMessageAsync($"{request.CarBrandName} isminde araba markası eklenmiştir.");
            _logger.LogInformation("Araba markası eklendi...");
            return new();
        }
    }
}
