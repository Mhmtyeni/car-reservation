namespace AracTakip.Application.Features.Queries.AppUser.GetAllUsers
{
    public class GetAllUsersQueryResponse
    {
        public int TotalUsersCount { get; set; }
        public object Users { get; set; }
    }
}