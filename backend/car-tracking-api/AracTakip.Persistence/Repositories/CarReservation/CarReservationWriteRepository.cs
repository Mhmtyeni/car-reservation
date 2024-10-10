using AracTakip.Application.Repositories.CarReservation;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.CarReservation
{
    public class CarReservationWriteRepository : WriteRepository<Domain.Entities.CarReservation>, ICarReservationWriteRepository
    {
        public CarReservationWriteRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
