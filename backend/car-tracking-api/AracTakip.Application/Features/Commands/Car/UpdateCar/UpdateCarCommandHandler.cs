using AracTakip.Application.Repositories.Car;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Commands.Car.UpdateCar
{
    public class UpdateCarCommandHandler : IRequestHandler<UpdateCarCommandRequest, UpdateCarCommandResponse>
    {
        readonly ICarWriteRepository _carWriteRepository;
        readonly ICarReadRepository _carReadRepository;
        readonly ILogger<UpdateCarCommandHandler> _logger;

        public UpdateCarCommandHandler(ICarReadRepository carReadRepository, ILogger<UpdateCarCommandHandler> logger, ICarWriteRepository carWriteRepository)
        {
            _carReadRepository = carReadRepository;
            _logger = logger;
            _carWriteRepository = carWriteRepository;
        }

        public async Task<UpdateCarCommandResponse> Handle(UpdateCarCommandRequest request, CancellationToken cancellationToken)
        {
            Domain.Entities.Car car = await _carReadRepository.GetByIdAsync(request.CarId);
            car.CarName = request.CarName;
            car.CarLicensePlate = request.CarLicensePlate;
            car.CarModelId = Guid.Parse(request.CarModelId);
            car.CarKM = request.CarKM;
            car.CarFuelStatus = request.CarFuelStatus;
            car.CarCapacity = request.CarCapacity;
            car.CarGearType = request.CarGearType;
            car.ChassisNumber = request.ChassisNumber;
            car.CarMaintenanceKM = request.CarMaintenanceKM;
            car.IsCarMaintenanceArrived = request.IsCarMaintenanceArrived;
            car.CarTypeId = Guid.Parse(request.CarTypeId);
            car.CarEngineTypeId = Guid.Parse(request.CarEngineTypeId);
            car.CompanyId = Guid.Parse(request.CompanyId);
            car.CarCaseTypeId = Guid.Parse(request.CarCaseTypeId);
            car.CarIMEI = request.CarIMEI;
            car.CarStatus = request.CarStatus;
            car.IsCarCommercial = request.IsCarCommercial;
            car.LocationId = Guid.Parse(request.LocationId);
            car.ModifiedDate = DateTime.UtcNow;
            car.IsPassive = request.IsPassive;
            await _carWriteRepository.SaveAsync();
            _logger.LogInformation("Araba güncellendi...");
            return new();
        }
    }
}
