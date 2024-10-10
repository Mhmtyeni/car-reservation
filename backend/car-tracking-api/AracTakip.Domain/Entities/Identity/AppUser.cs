using Microsoft.AspNetCore.Identity;

namespace AracTakip.Domain.Entities.Identity
{
    public class AppUser:IdentityUser<string>
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Sicil { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenEndDate { get; set; }
        public ICollection<UserImageFile> UserImageFiles { get; set; }
        public ICollection<CarReservation> CarReservations { get; set; }
    }
}
