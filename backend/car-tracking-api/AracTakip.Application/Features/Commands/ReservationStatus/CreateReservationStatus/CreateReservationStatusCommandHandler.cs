using AracTakip.Application.Repositories.ReservationStatus;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Commands.ReservationStatus.CreateReservationStatus
{
    public class CreateReservationStatusCommandHandler : IRequestHandler<CreateReservationStatusCommandRequest, CreateReservationStatusCommandResponse>
    {
        readonly IReservationStatusWriteRepository _reservationStatusWriteRepository;
        readonly ILogger<CreateReservationStatusCommandHandler> _logger;

        public CreateReservationStatusCommandHandler(IReservationStatusWriteRepository reservationStatusWriteRepository, ILogger<CreateReservationStatusCommandHandler> logger)
        {
            _reservationStatusWriteRepository = reservationStatusWriteRepository;
            _logger = logger;
        }

        public async Task<CreateReservationStatusCommandResponse> Handle(CreateReservationStatusCommandRequest request, CancellationToken cancellationToken)
        {
            await _reservationStatusWriteRepository.AddAsync(new()
            {
                StatusName = request.StatusName,
                CreatedDate = DateTime.UtcNow,
                ModifiedDate = DateTime.UtcNow,
                IsActive = true,
                IsDeleted = false
            });
            await _reservationStatusWriteRepository.SaveAsync();
            _logger.LogInformation($"{request.StatusName} adlı durum eklenmiştir...");
            return new();
        }
    }
}
