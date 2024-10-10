using AracTakip.Application.Repositories.CarReservationUser;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.CarReservationUser
{
    public class CarReservationUserReadRepository : ReadRepository<Domain.Entities.CarReservationUser>, ICarReservationUserReadRepository
    {
        public CarReservationUserReadRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
