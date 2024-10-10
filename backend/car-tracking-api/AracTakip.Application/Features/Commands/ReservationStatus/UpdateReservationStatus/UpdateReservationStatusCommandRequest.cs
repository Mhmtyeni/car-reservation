using MediatR;

namespace AracTakip.Application.Features.Commands.ReservationStatus.UpdateReservationStatus
{
    public class UpdateReservationStatusCommandRequest : IRequest<UpdateReservationStatusCommandResponse>
    {
        public string StatusId { get; set; }
        public string StatusName { get; set; }
    }
}
