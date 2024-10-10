using AracTakip.Application.DTOs.CarReservationUser;
using MediatR;

namespace AracTakip.Application.Features.Commands.CarReservation.CreateCarReservation
{
    public class CreateCarReservationCommandRequest : IRequest<CreateCarReservationCommandResponse>
    {
        public string CarId { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public string ReasonForRequest { get; set; }
        public string SubReasonForRequest { get; set; }
        public string ReasonForRequestDetails { get; set; }
        public string RouteStart { get; set; }
        public string RouteEnd { get; set; }
        public int PeopleCount { get; set; }
        public int DriverCount { get; set; }
        public string AppUserId { get; set; }
        public IList<ReservationUser> ReservationUsers { get; set; }
    }
}
