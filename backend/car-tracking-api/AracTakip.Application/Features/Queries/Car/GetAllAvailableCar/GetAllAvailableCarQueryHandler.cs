using AracTakip.Application.Features.Queries.Car.GetAllCar;
using AracTakip.Application.Repositories.Car;
using AracTakip.Application.Repositories.CarReservation;
using AracTakip.Application.Repositories.CarReservationApproval;
using AracTakip.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Queries.Car.GetAllAvailableCar
{
    public class GetAllAvailableCarQueryHandle : IRequestHandler<GetAllAvailableCarQueryRequest, GetAllAvailableCarQueryResponse>
    {
        readonly ICarReadRepository _carReadRepository;
        readonly ICarReservationApprovalReadRepository _carReservationApprovalReadRepository;
        readonly ICarReservationReadRepository _carReservationReadRepository;
        readonly ILogger<GetAllCarQueryHandler> _logger;

        public GetAllAvailableCarQueryHandle(ICarReadRepository carReadRepository, ICarReservationApprovalReadRepository carReservationApprovalReadRepository, ICarReservationReadRepository carReservationReadRepository, ILogger<GetAllCarQueryHandler> logger)
        {
            _carReadRepository = carReadRepository;
            _carReservationApprovalReadRepository = carReservationApprovalReadRepository;
            _carReservationReadRepository = carReservationReadRepository;
            _logger = logger;
        }

        public async Task<GetAllAvailableCarQueryResponse> Handle(GetAllAvailableCarQueryRequest request, CancellationToken cancellationToken)
        {
            TimeSpan difference = request.EndDateTime - request.StartDateTime;
            if (difference.TotalHours >= 1)
            {
                _logger.LogInformation("Tüm müsait arabalar");
                var cars = _carReadRepository.GetAll(false).Where(x => x.IsActive && !x.IsDeleted && !x.IsPassive && x.LocationId == Guid.Parse(request.LocationId) && x.CarTypeId == Guid.Parse(request.CarTypeId))
                    .Include(x => x.CarModel).ThenInclude(x => x.CarBrand)
                    .Include(x => x.Location)
                    .Include(x => x.CarType)
                    .Include(x=>x.CarCaseType)
                    .Include(x => x.CarEngineType)
                    .Include(x => x.Company)
                    .Include(x => x.CarImageFiles)
                    .ToList();
                var busyCarsId = _carReservationReadRepository.GetAll().Where(x => x.IsActive && !x.IsDeleted && !x.ReservationStatus && x.EndDateTime >= request.StartDateTime).Select(x => x.CarId).Distinct().ToList();
                cars = cars.Where(car => !busyCarsId.Contains(car.Id)).ToList();
                var totalCarCount = cars.Count();
                var carsResponse = cars.Skip(request.Page * request.Size).Take(request.Size)
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
                        p.CarCaseType.CarCaseTypeName,
                        p.CarEngineType.CarEngineTypeName,
                        p.Company.CompanyName,
                        p.CarIMEI,
                        p.CarStatus,
                        p.IsCarCommercial,
                        p.IsDeleted,
                        p.IsActive,
                        p.CreatedDate,
                        p.ModifiedDate,
                        CarImageFiles = p.CarImageFiles.Select(x => new CarImageFile()
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
                    }).ToList();
                return new()
                {
                    TotalCarCount = totalCarCount,
                    Cars = carsResponse
                };
            }
            else
                return new()
                {
                    Message= "Araç alış ve bırakış saati arasında en az 1 saat olmalıdır."
                };

          
        }
    }
}
