using AracTakip.Domain.Entities;

namespace AracTakip.Application.DTOs.User
{
    public class ListUser
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Sicil { get; set; }
        public string UserName { get; set; }
        public bool TwoFactorEnabled { get; set; }
        public string[] UserRoles { get; set; }
        public IList<Domain.Entities.File>? UserImages { get; set; }
    }


}