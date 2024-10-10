using AracTakip.Application.Repositories.Car;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Queries.Car.GetByIdCar
{
    public class GetByIdCarQueryHandler : IRequestHandler<GetByIdCarQueryRequest, GetByIdCarQueryResponse>
    {
        readonly ICarReadRepository _carReadRepository;
        readonly ILogger<GetByIdCarQueryHandler> _logger;

        public GetByIdCarQueryHandler(ICarReadRepository carReadRepository, ILogger<GetByIdCarQueryHandler> logger)
        {
            _carReadRepository = carReadRepository;
            _logger = logger;
        }

        public async Task<GetByIdCarQueryResponse> Handle(GetByIdCarQueryRequest request, CancellationToken cancellationToken)
        {
            Domain.Entities.Car car = await _carReadRepository
                .Table
                .Include(x => x.CarModel).ThenInclude(x => x.CarBrand)
                .Include(x => x.Location)
                .Include(x => x.CarType)
                .Include(x => x.CarCaseType)
                .Include(x => x.CarEngineType)
                .Include(x => x.Company)
                .Include(x => x.CarImageFiles)
                .FirstOrDefaultAsync(c => c.Id == Guid.Parse(request.CarId));
            _logger.LogInformation($"{car.CarName} ilgili arabanın bilgileri");
            return new()
            {
                CarName = car.CarName,
                CarLicensePlate = car.CarLicensePlate,
                CarBrandName = car.CarModel.CarBrand.CarBrandName,
                CarModelName = car.CarModel.CarModelName,
                CarKM = car.CarKM,
                CarFuelStatus = car.CarFuelStatus,
                CarCapacity = car.CarCapacity,
                CarGearType = car.CarGearType,
                IsPassive = car.IsPassive,
                ChassisNumber = car.ChassisNumber,
                LocationName = car.Location.LocationName,
                CarMaintenanceKM = car.CarMaintenanceKM,
                IsCarMaintenanceArrived = car.IsCarMaintenanceArrived,
                CarTypeName = car.CarType.CarTypeName,
                CarCaseTypeName = car.CarCaseType.CarCaseTypeName,
                CarEngineTypeName = car.CarEngineType.CarEngineTypeName,
                CompanyName = car.Company.CompanyName,
                CarIMEI = car.CarIMEI,
                CarStatus = car.CarStatus,
                IsCarCommercial = car.IsCarCommercial,
                IsDeleted = car.IsDeleted,
                IsActive = car.IsActive,
                CreatedDate = car.CreatedDate,
                ModifiedDate = car.ModifiedDate,
                CarImageFiles = car.CarImageFiles.Select(x => new Domain.Entities.CarImageFile()
                {
                    FileName = x.FileName,
                    Path = x.Path,
                    FileDescription = x.FileDescription,
                    Id = x.Id,
                    CreatedDate = x.CreatedDate,
                    ModifiedDate = x.ModifiedDate,
                    IsActive = x.IsActive,
                    IsDeleted = x.IsDeleted,
                    Storage = x.Storage
                }).ToList()
            };
        }
    }
}
