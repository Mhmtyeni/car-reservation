using AracTakip.Application.Features.Queries.Car.GetAllCar;
using AracTakip.Application.Repositories.Car;
using AracTakip.Application.Repositories.CarReservation;
using AracTakip.Application.Repositories.CarReservationApproval;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Queries.Car.GetAllUnavailableCarWithoutLocation
{
    public class GetAllUnavailableCarWithoutLocationQueryHandle : IRequestHandler<GetAllUnavailableCarWithoutLocationQueryRequest, GetAllUnavailableCarWithoutLocationQueryResponse>
    {
        readonly ICarReadRepository _carReadRepository;
        readonly ICarReservationApprovalReadRepository _carReservationApprovalReadRepository;
        readonly ICarReservationReadRepository _carReservationReadRepository;
        readonly ILogger<GetAllCarQueryHandler> _logger;

        public GetAllUnavailableCarWithoutLocationQueryHandle(ICarReadRepository carReadRepository, ICarReservationApprovalReadRepository carReservationApprovalReadRepository, ICarReservationReadRepository carReservationReadRepository, ILogger<GetAllCarQueryHandler> logger)
        {
            _carReadRepository = carReadRepository;
            _carReservationApprovalReadRepository = carReservationApprovalReadRepository;
            _carReservationReadRepository = carReservationReadRepository;
            _logger = logger;
        }

        public async Task<GetAllUnavailableCarWithoutLocationQueryResponse> Handle(GetAllUnavailableCarWithoutLocationQueryRequest request, CancellationToken cancellationToken)
        {            
            DateTime currentDate = DateTime.UtcNow.Date;
            DateTime endOfDay = currentDate.AddHours(23).AddMinutes(59).AddSeconds(59).AddMilliseconds(999);
            _logger.LogInformation("Tüm dolu arabalar");
            var totalCarCount = _carReservationReadRepository.GetAll(false).Where(x => x.IsActive && !x.IsDeleted && !x.ReservationStatus && x.EndDateTime >= endOfDay)
                .Where(x => x.Car.CarTypeId == Guid.Parse(request.CarTypeId))
                .Select(x => x.CarId).Distinct().Count();
            var busyCars = _carReservationReadRepository.GetAll(false).Where(x => x.IsActive && !x.IsDeleted && !x.ReservationStatus && x.EndDateTime >= endOfDay)
                .Include(x => x.Car).ThenInclude(x => x.Location)
                .Include(x => x.AppUser)
                .Where(x => x.Car.CarTypeId == Guid.Parse(request.CarTypeId))
                .GroupBy(x => x.CarId)
                .Select(g => g.First())
                .Skip(request.Page * request.Size).Take(request.Size)
                // Belleğe alınıyor, çünkü sonrasında Select işlemi client-side'da yapılacak
                .AsEnumerable()
                .Select(p => new
                {
                    p.Id,
                    p.AppUser.Name,
                    p.AppUser.Surname,
                    p.AppUser.Sicil,
                    p.Car.CarLicensePlate,
                    p.Car.CarIMEI,
                    p.Car.Location.LocationName,
                    p.EndDateTime,
                    p.CarId,
                    p.AppUserId,
                }).ToList();
            return new()
            {
                TotalCarCount = totalCarCount,
                Cars = busyCars
            };
        }
    }
}
