using AracTakip.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AracTakip.Domain.Entities
{
    public class CarReservationApproval:BaseEntity
    {
        public Guid CarReservationId { get; set; }
        public Guid ReservationStatusId { get; set; }
        public string Note { get; set; }
        public ReservationStatus ReservationStatus { get; set; }
        public CarReservation CarReservation { get; set; }

    }
}
