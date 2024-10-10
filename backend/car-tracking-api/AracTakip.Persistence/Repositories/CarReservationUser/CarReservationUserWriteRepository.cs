using AracTakip.Application.Repositories.CarReservationUser;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.CarReservationUser
{
    public class CarReservationUserWriteRepository : WriteRepository<Domain.Entities.CarReservationUser>, ICarReservationUserWriteRepository
    {
        public CarReservationUserWriteRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
