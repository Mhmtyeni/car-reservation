using MediatR;

namespace AracTakip.Application.Features.Commands.ReservationStatus.RemoveReservationStatus
{
    public class RemoveReservationStatusCommandRequest : IRequest<RemoveReservationStatusCommandResponse>
    {
        public string StatusId { get; set; }
    }
}
