using AracTakip.Application.Abstractions.Hubs;
using AracTakip.Application.Repositories.CarModel;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Commands.CarModel.CreateCarModel
{
    public class CreateCarModelCommandHandler : IRequestHandler<CreateCarModelCommandRequest, CreateCarModelCommandResponse>
    {
        ICarModelWriteRepository _carModelWriteRepository;
        ICarModelHubService _carModelHubService;
        ILogger<CreateCarModelCommandHandler> _logger;

        public CreateCarModelCommandHandler(ICarModelWriteRepository carModelWriteRepository, ICarModelHubService carModelHubService, ILogger<CreateCarModelCommandHandler> logger)
        {
            _carModelWriteRepository = carModelWriteRepository;
            _carModelHubService = carModelHubService;
            _logger = logger;
        }

        public async Task<CreateCarModelCommandResponse> Handle(CreateCarModelCommandRequest request, CancellationToken cancellationToken)
        {
            await _carModelWriteRepository.AddAsync(new()
            {
                CarModelName = request.CarModelName,
                CarBrandId = Guid.Parse(request.CarBrandId),
                CreatedDate = DateTime.UtcNow,
                IsActive = true,
                IsDeleted = false,
                ModifiedDate = DateTime.UtcNow,
            });
            await _carModelWriteRepository.SaveAsync();
            await _carModelHubService.CarModelAddedMessageAsync($"{request.CarModelName} isminde model eklenmiştir.");
            _logger.LogInformation("Araba modeli eklendi...");
            return new();
        }
    }
}
