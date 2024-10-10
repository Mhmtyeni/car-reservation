using AracTakip.Domain.Entities.Common;

namespace AracTakip.Domain.Entities
{
    public class CarReservationProcess : BaseEntity
    {
        public Guid CarId { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public bool ReservationStatus { get; set; }
        public Car Car { get; set; }
    }
}
