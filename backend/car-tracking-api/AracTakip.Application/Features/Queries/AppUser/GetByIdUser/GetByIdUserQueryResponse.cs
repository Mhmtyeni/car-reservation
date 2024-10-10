namespace AracTakip.Application.Features.Queries.AppUser.GetByIdUser
{
    public class GetByIdUserQueryResponse
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
