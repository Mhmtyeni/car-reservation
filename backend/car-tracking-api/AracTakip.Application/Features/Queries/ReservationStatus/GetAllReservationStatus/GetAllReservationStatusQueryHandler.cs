using AracTakip.Application.Repositories.Location;
using AracTakip.Application.Repositories.ReservationStatus;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Queries.ReservationStatus.GetAllReservationStatus
{
    public class GetAllReservationStatusQueryHandler : IRequestHandler<GetAllReservationStatusQueryRequest, GetAllReservationStatusQueryResponse>
    {
        readonly IReservationStatusReadRepository _reservationStatusReadRepository;
        readonly ILogger<GetAllReservationStatusQueryHandler> _logger;

        public GetAllReservationStatusQueryHandler(IReservationStatusReadRepository reservationStatusReadRepository, ILogger<GetAllReservationStatusQueryHandler> logger)
        {
            _reservationStatusReadRepository = reservationStatusReadRepository;
            _logger = logger;
        }

        public async Task<GetAllReservationStatusQueryResponse> Handle(GetAllReservationStatusQueryRequest request, CancellationToken cancellationToken)
        {
            var totalReservationStatusCount = _reservationStatusReadRepository.GetAll(false)
                .Where(x => x.IsActive == request.IsActive && x.IsDeleted == request.IsDeleted).Count();
            var reservationStatues = _reservationStatusReadRepository.GetAll(false)
                .Where(x => x.IsActive == request.IsActive && x.IsDeleted == request.IsDeleted)
                .Skip(request.Page * request.Size)
                .Take(request.Size);
            _logger.LogInformation("Tüm rezevarsyon statüleri");
            return new()
            {
                TotalReservationStatusCount = totalReservationStatusCount,
                ReservationStatues = reservationStatues
            };
        }
    }
}
