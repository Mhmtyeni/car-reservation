using AracTakip.Domain.Entities.Identity;

namespace AracTakip.Domain.Entities
{
    public class CarReservationUserImageFile : File
    {
        public ICollection<CarReservationUser> CarReservationUsers { get; set; }
    }
}
