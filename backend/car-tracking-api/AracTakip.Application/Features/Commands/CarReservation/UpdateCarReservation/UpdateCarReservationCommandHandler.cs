using AracTakip.Application.Repositories.CarReservation;
using AracTakip.Application.Repositories.CarReservationApproval;
using AracTakip.Application.Repositories.ReservationStatus;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Commands.CarReservation.UpdateCarReservation
{
    public class UpdateCarReservationCommandHandler : IRequestHandler<UpdateCarReservationCommandRequest, UpdateCarReservationCommandResponse>
    {
        readonly ICarReservationReadRepository _carReservationReadRepository;
        readonly ICarReservationWriteRepository _carReservationWriteRepository;
        readonly ICarReservationApprovalReadRepository _carReservationApprovalReadRepository;
        readonly ICarReservationApprovalWriteRepository _carReservationApprovalWriteRepository;
        readonly IReservationStatusReadRepository _reservationStatusReadRepository;
        readonly ILogger<UpdateCarReservationCommandHandler> _logger;

        public UpdateCarReservationCommandHandler(ICarReservationReadRepository carReservationReadRepository, ICarReservationWriteRepository carReservationWriteRepository, ILogger<UpdateCarReservationCommandHandler> logger, ICarReservationApprovalReadRepository carReservationApprovalReadRepository, ICarReservationApprovalWriteRepository carReservationApprovalWriteRepository, IReservationStatusReadRepository reservationStatusReadRepository)
        {
            _carReservationReadRepository = carReservationReadRepository;
            _carReservationWriteRepository = carReservationWriteRepository;
            _logger = logger;
            _carReservationApprovalReadRepository = carReservationApprovalReadRepository;
            _carReservationApprovalWriteRepository = carReservationApprovalWriteRepository;
            _reservationStatusReadRepository = reservationStatusReadRepository;
        }

        public async Task<UpdateCarReservationCommandResponse> Handle(UpdateCarReservationCommandRequest request, CancellationToken cancellationToken)
        {
            Domain.Entities.CarReservationApproval carReservationApproval = await _carReservationApprovalReadRepository.GetByIdAsync(request.CarReservationApprovalId);
            if (request.Note != null)
                carReservationApproval.Note = request.Note;
            else
                carReservationApproval.Note = "Araç arızası nedeniyle rezervasyon yaptığınız araç değiştirilmiştir.Dilerseniz yeni ataması yapılan araçla devam edebilir ya da rezervasyonunuzu iptal edebilirsiniz.";
            var approvalStatusId = _reservationStatusReadRepository.GetWhere(x => x.StatusName == "Onaylandı").FirstOrDefault();
            carReservationApproval.ReservationStatusId = approvalStatusId.Id;
            await _carReservationApprovalWriteRepository.SaveAsync();
            _logger.LogInformation("Rezervasyon değiştirilmiştir.");
            Domain.Entities.CarReservation carReservation = await _carReservationReadRepository.GetByIdAsync(carReservationApproval.CarReservationId.ToString());
            carReservation.CarId = Guid.Parse(request.CarId);
            await _carReservationWriteRepository.SaveAsync();
            _logger.LogInformation("Yeni araç tanımlanarak rezervasyon güncellenmiştir.");
            return new();   
        }
    }
}
