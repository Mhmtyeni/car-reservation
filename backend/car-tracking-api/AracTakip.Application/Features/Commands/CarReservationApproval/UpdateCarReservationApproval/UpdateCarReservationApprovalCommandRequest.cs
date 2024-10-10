using MediatR;

namespace AracTakip.Application.Features.Commands.CarReservationApproval.UpdateCarReservationApproval
{
    public class UpdateCarReservationApprovalCommandRequest : IRequest<UpdateCarReservationApprovalCommandResponse>
    {
        public string CarReservationApprovalId { get; set; }
        public string? Note { get; set; }
        public string ReservationStatusId { get; set; }
    }
}
