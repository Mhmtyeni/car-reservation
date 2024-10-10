using AracTakip.Application.Repositories.CarReservation;
using AracTakip.Application.Repositories.CarReservationApproval;
using AracTakip.Application.Repositories.ReservationStatus;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Commands.CarReservationApproval.UpdateCarReservationApproval
{
    public class UpdateCarReservationApprovalCommandHandler : IRequestHandler<UpdateCarReservationApprovalCommandRequest, UpdateCarReservationApprovalCommandResponse>
    {
        readonly ICarReservationApprovalReadRepository _carReservationApprovalReadRepository;
        readonly ICarReservationApprovalWriteRepository _carReservationApprovalWriteRepository;
        readonly IReservationStatusReadRepository _reservationStatusReadRepository;
        readonly ICarReservationReadRepository _carReservationReadRepository;
        readonly ICarReservationWriteRepository _carReservationWriteRepository;
        readonly ILogger<UpdateCarReservationApprovalCommandHandler> _logger;

        public UpdateCarReservationApprovalCommandHandler(ICarReservationApprovalReadRepository carReservationApprovalReadRepository, ICarReservationApprovalWriteRepository carReservationApprovalWriteRepository, ILogger<UpdateCarReservationApprovalCommandHandler> logger, IReservationStatusReadRepository reservationStatusReadRepository, ICarReservationReadRepository carReservationReadRepository, ICarReservationWriteRepository carReservationWriteRepository)
        {
            _carReservationApprovalReadRepository = carReservationApprovalReadRepository;
            _carReservationApprovalWriteRepository = carReservationApprovalWriteRepository;
            _logger = logger;
            _reservationStatusReadRepository = reservationStatusReadRepository;
            _carReservationReadRepository = carReservationReadRepository;
            _carReservationWriteRepository = carReservationWriteRepository;
        }

        public async Task<UpdateCarReservationApprovalCommandResponse> Handle(UpdateCarReservationApprovalCommandRequest request, CancellationToken cancellationToken)
        {
            Domain.Entities.CarReservationApproval carReservationApproval = await _carReservationApprovalReadRepository.GetByIdAsync(request.CarReservationApprovalId);
            Domain.Entities.ReservationStatus reservationStatus = await _reservationStatusReadRepository.GetByIdAsync(request.ReservationStatusId);
            if (request.Note != null)
                carReservationApproval.Note = request.Note;
            else
                carReservationApproval.Note = reservationStatus.StatusName;
            carReservationApproval.ReservationStatusId = Guid.Parse(request.ReservationStatusId);
            if (reservationStatus.StatusName == "Reddedildi" || reservationStatus.StatusName == "Tamamlandı")
            {
                Domain.Entities.CarReservation carReservation = await _carReservationReadRepository.GetByIdAsync(carReservationApproval.CarReservationId.ToString());
                carReservation.ReservationStatus = true;
                await _carReservationWriteRepository.SaveAsync();
            }
            await _carReservationApprovalWriteRepository.SaveAsync();
            return new();

        }
    }
}
