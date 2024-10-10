using AracTakip.Application.Repositories.ReservationStatus;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Commands.ReservationStatus.UpdateReservationStatus
{
    public class UpdateReservationStatusCommandHandler : IRequestHandler<UpdateReservationStatusCommandRequest, UpdateReservationStatusCommandResponse>
    {
        readonly IReservationStatusReadRepository _reservationStatusReadRepository;
        readonly IReservationStatusWriteRepository _reservationStatusWriteRepository;
        readonly ILogger<UpdateReservationStatusCommandHandler> _logger;

        public UpdateReservationStatusCommandHandler(IReservationStatusReadRepository reservationStatusReadRepository, IReservationStatusWriteRepository reservationStatusWriteRepository, ILogger<UpdateReservationStatusCommandHandler> logger)
        {
            _reservationStatusReadRepository = reservationStatusReadRepository;
            _reservationStatusWriteRepository = reservationStatusWriteRepository;
            _logger = logger;
        }

        public async Task<UpdateReservationStatusCommandResponse> Handle(UpdateReservationStatusCommandRequest request, CancellationToken cancellationToken)
        {
            Domain.Entities.ReservationStatus reservationStatus = await _reservationStatusReadRepository.GetByIdAsync(request.StatusId);
            reservationStatus.StatusName = request.StatusName;
            reservationStatus.ModifiedDate = DateTime.UtcNow;
            await _reservationStatusWriteRepository.SaveAsync();
            _logger.LogInformation("Statu güncellendi...");
            return new();
        }
    }
}
