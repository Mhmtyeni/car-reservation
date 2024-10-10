using AracTakip.Application.Features.Queries.CarReservationApproval.GetAllCarReservationApproval;
using AracTakip.Application.Repositories.CarReservationApproval;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Queries.CarReservationApproval.GetByUserIdCarReservationApproval
{
    public class GetByUserIdCarReservationApprovalQueryHandler : IRequestHandler<GetByUserIdCarReservationApprovalQueryRequest, GetByUserIdCarReservationApprovalQueryResponse>
    {
        readonly ICarReservationApprovalReadRepository _carReservationApprovalReadRepository;
        readonly ILogger<GetByUserIdCarReservationApprovalQueryHandler> _logger;

        public GetByUserIdCarReservationApprovalQueryHandler(ICarReservationApprovalReadRepository carReservationApprovalReadRepository, ILogger<GetByUserIdCarReservationApprovalQueryHandler> logger)
        {
            _carReservationApprovalReadRepository = carReservationApprovalReadRepository;
            _logger = logger;
        }

        public async Task<GetByUserIdCarReservationApprovalQueryResponse> Handle(GetByUserIdCarReservationApprovalQueryRequest request, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Tüm araç rezevarsyon işlemleri");
            var totalCarReservationApprovalCount = _carReservationApprovalReadRepository.GetAll(false)
                .Include(x => x.CarReservation)
                .Include(x => x.ReservationStatus)
                .Where(x => x.IsActive == request.IsActive && x.IsDeleted == request.IsDeleted && x.CarReservation.AppUserId == request.UserId && x.ReservationStatusId == Guid.Parse(request.ReservationStatusId))
                .Count();

            var carReservationApprovals = _carReservationApprovalReadRepository.GetAll(false)
                .Where(x => x.IsActive == request.IsActive && x.IsDeleted == request.IsDeleted && x.CarReservation.AppUserId == request.UserId && x.ReservationStatusId == Guid.Parse(request.ReservationStatusId))
                .Skip(request.Page * request.Size)
                .Take(request.Size)
                .Include(x => x.ReservationStatus)
                .Include(x => x.CarReservation)
                .Include(x => x.CarReservation.CarReservationUsers).ThenInclude(x => x.CarReservationUserImageFiles)
                .Select(p => new
                {
                    p.Id,
                    p.CarReservation.StartDateTime,
                    p.CarReservation.EndDateTime,
                    p.CarReservation.ReasonForRequest,
                    p.CarReservation.SubReasonForRequest,
                    p.CarReservation.ReasonForRequestDetails,
                    p.CarReservation.RouteStart,
                    p.CarReservation.RouteEnd,
                    CarReservationInReservationStatus = p.CarReservation.ReservationStatus,
                    p.CarReservation.PeopleCount,
                    p.CarReservation.DriverCount,
                    p.Note,
                    p.ReservationStatus.StatusName,
                    ReservationStatusId = p.ReservationStatus.Id,
                    CarReservationUsers = p.CarReservation.CarReservationUsers.Select(x => new
                    {
                        x.NameSurname,
                        x.TC,
                        x.Sicil,
                        x.IsDriver,
                        CarReservationUserImageFile = x.CarReservationUserImageFiles.Select(x => new
                        {
                            x.Id,
                            x.FileName,
                            x.Path,
                            x.FileDescription,
                            x.CreatedDate,
                            x.ModifiedDate,
                            x.IsActive,
                            x.IsDeleted,
                            x.Storage
                        })
                    }),
                    p.CarReservation.CarId,
                    p.CarReservation.AppUserId,
                    p.IsDeleted,
                    p.IsActive,
                    p.CreatedDate,
                    p.ModifiedDate,
                }).ToList();

            return new()
            {
                TotalCarReservationApprovalCount = totalCarReservationApprovalCount,
                CarReservationApprovals = carReservationApprovals
            };
        }
    }
}
