using AracTakip.Domain.Entities.Common;
using AracTakip.Domain.Entities.Identity;

namespace AracTakip.Domain.Entities
{
    public class CarReservation : BaseEntity
    {
        public Guid CarId { get; set; }
        public string AppUserId { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public string ReasonForRequest { get; set; }
        public string SubReasonForRequest { get; set; }
        public string? ReasonForRequestDetails { get; set; }
        public string RouteStart { get; set; }
        public string RouteEnd { get; set; }
        public bool ReservationStatus { get; set; } = false;
        public int PeopleCount { get; set; }
        public int DriverCount { get; set; }
        public Car Car { get; set; }
        public AppUser AppUser { get; set; }
        public ICollection<CarReservationUser> CarReservationUsers { get; set; }

    }
}
