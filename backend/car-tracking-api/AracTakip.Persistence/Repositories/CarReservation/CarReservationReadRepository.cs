using AracTakip.Application.Repositories.CarReservation;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.CarReservation
{
    public class CarReservationReadRepository : ReadRepository<Domain.Entities.CarReservation>, ICarReservationReadRepository
    {
        public CarReservationReadRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
