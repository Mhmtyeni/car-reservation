using AracTakip.Domain.Entities.Identity;

namespace AracTakip.Domain.Entities
{
    public class UserImageFile : File
    {
        public ICollection<AppUser> AppUsers { get; set; }
    }
}
