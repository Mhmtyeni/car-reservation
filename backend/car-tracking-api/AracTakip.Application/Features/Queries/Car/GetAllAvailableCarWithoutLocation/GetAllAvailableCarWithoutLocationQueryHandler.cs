using AracTakip.Application.Features.Queries.Car.GetAllCar;
using AracTakip.Application.Repositories.Car;
using AracTakip.Application.Repositories.CarReservation;
using AracTakip.Application.Repositories.CarReservationApproval;
using AracTakip.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Queries.Car.GetAllAvailableCarWithoutLocation
{
    public class GetAllAvailableCarWithoutLocationQueryHandle : IRequestHandler<GetAllAvailableCarWithoutLocationQueryRequest, GetAllAvailableCarWithoutLocationQueryResponse>
    {
        readonly ICarReadRepository _carReadRepository;
        readonly ICarReservationApprovalReadRepository _carReservationApprovalReadRepository;
        readonly ICarReservationReadRepository _carReservationReadRepository;
        readonly ILogger<GetAllCarQueryHandler> _logger;

        public GetAllAvailableCarWithoutLocationQueryHandle(ICarReadRepository carReadRepository, ICarReservationApprovalReadRepository carReservationApprovalReadRepository, ICarReservationReadRepository carReservationReadRepository, ILogger<GetAllCarQueryHandler> logger)
        {
            _carReadRepository = carReadRepository;
            _carReservationApprovalReadRepository = carReservationApprovalReadRepository;
            _carReservationReadRepository = carReservationReadRepository;
            _logger = logger;
        }

        public async Task<GetAllAvailableCarWithoutLocationQueryResponse> Handle(GetAllAvailableCarWithoutLocationQueryRequest request, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Tüm müsait arabalar");
            var cars = _carReadRepository.GetAll(false).Where(x => x.IsActive && !x.IsDeleted && !x.IsPassive && x.CarTypeId == Guid.Parse(request.CarTypeId))
                .Include(x => x.CarModel).ThenInclude(x => x.CarBrand)
                .Include(x => x.Location)
                .Include(x => x.CarType)
                .Include(x => x.CarEngineType)
                .Include(x => x.Company)
                .Include(x => x.CarImageFiles)
                .ToList();
            var busyCarsId = _carReservationReadRepository.GetAll().Where(x => x.IsActive && !x.IsDeleted && !x.ReservationStatus && x.EndDateTime >= DateTime.UtcNow).Select(x => x.CarId).Distinct().ToList();
            cars = cars.Where(car => !busyCarsId.Contains(car.Id)).ToList();
            var totalCarCount = cars.Count();
            var carsResponse = cars.Skip(request.Page * request.Size).Take(request.Size)
                .Select(p => new
                {
                    p.Id,
                    p.CarLicensePlate,
                    p.CarIMEI,
                    p.Location.LocationName,
                }).ToList();
            return new()
            {
                TotalCarCount = totalCarCount,
                Cars = carsResponse
            };
        }
    }
}
