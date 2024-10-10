using AracTakip.Application.Repositories.ReservationStatus;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Commands.ReservationStatus.RemoveReservationStatus
{
    public class RemoveReservationStatusCommandHandler : IRequestHandler<RemoveReservationStatusCommandRequest, RemoveReservationStatusCommandResponse>
    {
        readonly IReservationStatusReadRepository _reservationStatusReadRepository;
        readonly IReservationStatusWriteRepository _reservationStatusWriteRepository;
        readonly ILogger<RemoveReservationStatusCommandHandler> _logger;

        public RemoveReservationStatusCommandHandler(IReservationStatusReadRepository reservationStatusReadRepository, IReservationStatusWriteRepository reservationStatusWriteRepository, ILogger<RemoveReservationStatusCommandHandler> logger)
        {
            _reservationStatusReadRepository = reservationStatusReadRepository;
            _reservationStatusWriteRepository = reservationStatusWriteRepository;
            _logger = logger;
        }

        public async Task<RemoveReservationStatusCommandResponse> Handle(RemoveReservationStatusCommandRequest request, CancellationToken cancellationToken)
        {
            Domain.Entities.ReservationStatus reservationStatus = await _reservationStatusReadRepository.GetByIdAsync(request.StatusId);
            reservationStatus.IsDeleted = true;
            reservationStatus.IsActive = false;
            reservationStatus.ModifiedDate = DateTime.UtcNow;
            await _reservationStatusWriteRepository.SaveAsync();
            _logger.LogInformation($"{reservationStatus.StatusName} silinmiştir...");
            return new();
        }
    }
}
