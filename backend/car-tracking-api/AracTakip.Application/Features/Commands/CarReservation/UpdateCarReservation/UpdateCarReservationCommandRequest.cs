using MediatR;

namespace AracTakip.Application.Features.Commands.CarReservation.UpdateCarReservation
{
    public class UpdateCarReservationCommandRequest : IRequest<UpdateCarReservationCommandResponse>

    {
        public string CarReservationApprovalId { get; set; }
        public string? Note { get; set; }
        public string CarId { get; set; }
    }
}
