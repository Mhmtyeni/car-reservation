using AracTakip.Application.Repositories.CarReservationProcess;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.CarReservationProcess
{
    public class CarReservationProcessReadRepository : ReadRepository<Domain.Entities.CarReservationProcess>, ICarReservationProcessReadRepository
    {
        public CarReservationProcessReadRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
