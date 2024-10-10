using AracTakip.Application.Repositories.Car;
using AracTakip.Application.Repositories.CarReservation;
using AracTakip.Application.Repositories.CarReservationApproval;
using AracTakip.Application.Repositories.ReservationStatus;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Commands.Car.ChangePassive
{
    public class ChangePassiveCommandHandler : IRequestHandler<ChangePassiveCommandRequest, ChangePassiveCommandResponse>
    {
        readonly ICarReadRepository _carReadRepository;
        readonly ICarWriteRepository _carWriteRepository;
        readonly ICarReservationApprovalReadRepository _carReservationApprovalReadRepository;
        readonly ICarReservationApprovalWriteRepository _carReservationApprovalWriteRepository;
        readonly ICarReservationReadRepository _carReservationReadRepository;
        readonly ICarReservationWriteRepository _carReservationWriteRepository;
        readonly IReservationStatusReadRepository _reservationStatusReadRepository;
        readonly ILogger<ChangePassiveCommandHandler> _logger;

        public ChangePassiveCommandHandler(ICarReadRepository carReadRepository, ICarWriteRepository carWriteRepository, ILogger<ChangePassiveCommandHandler> logger, ICarReservationApprovalReadRepository carReservationApprovalReadRepository, ICarReservationApprovalWriteRepository carReservationApprovalWriteRepository, ICarReservationReadRepository carReservationReadRepository, ICarReservationWriteRepository carReservationWriteRepository, IReservationStatusReadRepository reservationStatusReadRepository)
        {
            _carReadRepository = carReadRepository;
            _carWriteRepository = carWriteRepository;
            _logger = logger;
            _carReservationApprovalReadRepository = carReservationApprovalReadRepository;
            _carReservationApprovalWriteRepository = carReservationApprovalWriteRepository;
            _carReservationReadRepository = carReservationReadRepository;
            _carReservationWriteRepository = carReservationWriteRepository;
            _reservationStatusReadRepository = reservationStatusReadRepository;
        }

        public async Task<ChangePassiveCommandResponse> Handle(ChangePassiveCommandRequest request, CancellationToken cancellationToken)
        {
            Domain.Entities.Car car = await _carReadRepository.GetByIdAsync(request.CarId);
            car.IsPassive = request.IsPassive;
            await _carWriteRepository.SaveAsync();
            if (!request.IsPassive)
                _logger.LogInformation($"{car.CarName} arac aktif duruma alınmıştır...");
            if (request.IsPassive)
            {
                _logger.LogInformation($"{car.CarName} arac pasif duruma alınmıştır...");               
                var carRezervations = await _carReservationReadRepository.GetAll().Where(x => !x.ReservationStatus && x.IsActive && !x.IsDeleted && x.CarId == Guid.Parse(request.CarId)).ToListAsync();
                List<Domain.Entities.CarReservationApproval> carRezervationApprovals = new List<Domain.Entities.CarReservationApproval>();
                foreach (var item in carRezervations)
                {
                    item.ReservationStatus = true;
                    var approvals = await _carReservationApprovalReadRepository.GetAll().Where(x => x.CarReservationId == item.Id).ToListAsync();
                    carRezervationApprovals.AddRange(approvals);
                }
                await _carReservationWriteRepository.SaveAsync();
                _logger.LogInformation("rezervasyon beklemeye alınmıştır...");
                var waitingStatusId = await _reservationStatusReadRepository.GetAll(false).Where(x => x.StatusName == "Bekleniyor").Select(x => x.Id).FirstOrDefaultAsync();
                foreach (var item in carRezervationApprovals)
                {
                    item.ReservationStatusId = waitingStatusId;
                    item.Note = "Araç probleminden kaynaklı bir sorun oluştuğu için rezervasyonunuz beklemeye alınmıştır.Lütfen yetkili personelin yeni bir araç atamasını bekleyiniz yada rezervasyonunuzu iptal edinizi..";
                }
                await _carReservationApprovalWriteRepository.SaveAsync();
                _logger.LogInformation("rezervasyon durumu güncellenmiştir...");

            }
            return new();
        }
    }
}
