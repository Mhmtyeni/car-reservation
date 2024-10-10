using AracTakip.Application.Repositories.Car;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Queries.Car.GetAllCar
{
    public class GetAllCarQueryHandler : IRequestHandler<GetAllCarQueryRequest, GetAllCarQueryResponse>
    {
        readonly ICarReadRepository _carReadRepository;
        readonly ILogger<GetAllCarQueryHandler> _logger;

        public GetAllCarQueryHandler(ILogger<GetAllCarQueryHandler> logger, ICarReadRepository carReadRepository)
        {
            _logger = logger;
            _carReadRepository = carReadRepository;
        }

        public async Task<GetAllCarQueryResponse> Handle(GetAllCarQueryRequest request, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Tüm arabalar");
            var totalCarCount = _carReadRepository.GetAll(false)
               .Where(x => x.IsActive == request.IsActive && x.IsDeleted == request.IsDeleted)
            .Count();
            var cars = _carReadRepository.GetAll(false)
                .Where(x => x.IsActive == request.IsActive && x.IsDeleted == request.IsDeleted)
                .Skip(request.Page * request.Size)
                .Take(request.Size)
                .Include(x => x.CarModel).ThenInclude(x => x.CarBrand)
                .Include(x => x.Location)
                .Include(x => x.CarType)
                .Include(x => x.CarCaseType)
                .Include(x => x.CarEngineType)
                .Include(x => x.Company)
                .Include(x => x.CarImageFiles)

                .Select(p => new
                {
                    p.Id,
                    p.CarName,
                    p.CarLicensePlate,
                    p.CarModel.CarBrand.CarBrandName,
                    p.CarModel.CarModelName,
                    p.CarKM,
                    p.CarFuelStatus,
                    p.CarCapacity,
                    p.CarGearType,
                    p.IsPassive,
                    p.ChassisNumber,
                    p.Location.LocationName,
                    p.CarMaintenanceKM,
                    p.IsCarMaintenanceArrived,
                    p.CarType.CarTypeName,
                    p.CarEngineType.CarEngineTypeName,
                    p.Company.CompanyName,
                    p.CarCaseType.CarCaseTypeName,
                    p.CarIMEI,
                    p.CarStatus,
                    p.IsCarCommercial,
                    p.IsDeleted,
                    p.IsActive,
                    p.CreatedDate,
                    p.ModifiedDate,
                    p.CarImageFiles,
                }).ToList();

            return new()
            {
                TotalCarCount = totalCarCount,
                Cars = cars
            };
        }
    }
}
