using AracTakip.Application.Repositories.ReservationStatus;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Queries.ReservationStatus.GetByIdReservationStatus
{
    public class GetByIdReservationStatusQueryHandler : IRequestHandler<GetByIdReservationStatusQueryRequest, GetByIdReservationStatusQueryResponse>
    {
        readonly IReservationStatusReadRepository _reservationStatusReadRepository;
        readonly ILogger<GetByIdReservationStatusQueryHandler> _logger;

        public GetByIdReservationStatusQueryHandler(IReservationStatusReadRepository reservationStatusReadRepository, ILogger<GetByIdReservationStatusQueryHandler> logger)
        {
            _reservationStatusReadRepository = reservationStatusReadRepository;
            _logger = logger;
        }

        public async Task<GetByIdReservationStatusQueryResponse> Handle(GetByIdReservationStatusQueryRequest request, CancellationToken cancellationToken)
        {
            Domain.Entities.ReservationStatus reservationStatus = await _reservationStatusReadRepository.GetByIdAsync(request.StatusId);
            _logger.LogInformation($"{reservationStatus.StatusName} statünün bilgileri...");
            return new()
            {
                StatusName = reservationStatus.StatusName,
                CreatedDate = reservationStatus.CreatedDate,
                ModifiedDate = reservationStatus.ModifiedDate,
                IsActive = reservationStatus.IsActive,
                IsDeleted = reservationStatus.IsDeleted,
            };
        }
    }
}
