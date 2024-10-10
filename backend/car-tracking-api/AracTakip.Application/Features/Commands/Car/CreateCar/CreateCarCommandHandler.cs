using AracTakip.Application.Abstractions.Hubs;
using AracTakip.Application.Repositories.Car;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Commands.Car.CreateCar
{
    public class CreateCarCommandHandler : IRequestHandler<CreateCarCommandRequest, CreateCarCommandResponse>
    {
        readonly ICarWriteRepository _carWriteRepository;
        readonly ICarHubService _carHubService;
        readonly ILogger<CreateCarCommandHandler> _logger;

        public CreateCarCommandHandler(ICarWriteRepository carWriteRepository, ICarHubService carHubService, ILogger<CreateCarCommandHandler> logger)
        {
            _carWriteRepository = carWriteRepository;
            _carHubService = carHubService;
            _logger = logger;
        }

        public async Task<CreateCarCommandResponse> Handle(CreateCarCommandRequest request, CancellationToken cancellationToken)
        {
            var car = new Domain.Entities.Car
            {
                CarName = request.CarName,
                CarLicensePlate = request.CarLicensePlate,
                CarModelId = Guid.Parse(request.CarModelId),
                CarKM = request.CarKM,
                CarFuelStatus = request.CarFuelStatus,
                CarCapacity = request.CarCapacity,
                CarGearType = request.CarGearType,
                ChassisNumber = request.ChassisNumber,
                CarMaintenanceKM = request.CarMaintenanceKM,
                IsCarMaintenanceArrived = request.IsCarMaintenanceArrived,
                CarTypeId = Guid.Parse(request.CarTypeId),
                CarEngineTypeId = Guid.Parse(request.CarEngineTypeId),
                CompanyId = Guid.Parse(request.CompanyId),
                CarIMEI = request.CarIMEI,
                CarStatus = request.CarStatus,
                IsCarCommercial = request.IsCarCommercial,
                LocationId = Guid.Parse(request.LocationId),
                CarCaseTypeId = Guid.Parse(request.CarCaseTypeId),
                IsActive = true,
                IsDeleted = false,
                IsPassive = false,
                CreatedDate = DateTime.UtcNow,
                ModifiedDate = DateTime.UtcNow,
            };
            await _carWriteRepository.AddAsync(car);
            await _carWriteRepository.SaveAsync();
            await _carHubService.CarAddedMessageAsync($"{request.CarName} isminde araba eklenmiştir.");
            _logger.LogInformation("Araba eklendi...");
            return new()
            {
                CarId = car.Id.ToString(),
            };
        }
    }
}
