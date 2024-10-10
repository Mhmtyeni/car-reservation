using AracTakip.Application.Repositories.Car;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Queries.Car.GetAllCarByPassive
{
    public class GetAllCarByPassiveQueryHandler : IRequestHandler<GetAllCarByPassiveQueryRequest, GetAllCarByPassiveQueryResponse>
    {
        readonly ICarReadRepository _carReadRepository;
        readonly ILogger<GetAllCarByPassiveQueryHandler> _logger;

        public GetAllCarByPassiveQueryHandler(ICarReadRepository carReadRepository, ILogger<GetAllCarByPassiveQueryHandler> logger)
        {
            _carReadRepository = carReadRepository;
            _logger = logger;
        }

        public async Task<GetAllCarByPassiveQueryResponse> Handle(GetAllCarByPassiveQueryRequest request, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Tüm pasif veya aktif araçlar");
            var totalCarCount = _carReadRepository.GetAll(false)
               .Where(x => x.IsActive == request.IsActive && x.IsDeleted == request.IsDeleted && x.IsPassive == request.IsPassive)
            .Count();
            var cars = _carReadRepository.GetAll(false)
                .Where(x => x.IsActive == request.IsActive && x.IsDeleted == request.IsDeleted&& x.IsPassive == request.IsPassive)
                .Skip(request.Page * request.Size)
                .Take(request.Size)
                .Include(x => x.CarModel).ThenInclude(x => x.CarBrand)
                .Include(x => x.Location)
                .Include(x => x.CarType)
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
                    p.CarCaseType.CarCaseTypeName,
                    p.Company.CompanyName,
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
