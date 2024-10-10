using MediatR;

namespace AracTakip.Application.Features.Commands.ReservationStatus.CreateReservationStatus
{
    public class CreateReservationStatusCommandRequest : IRequest<CreateReservationStatusCommandResponse>
    {
        public string StatusName { get; set; }
    }
}
