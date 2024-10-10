using AracTakip.Application.Repositories.CarReservationProcess;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.CarReservationProcess
{
    public class CarReservationProcessWriteRepository : WriteRepository<Domain.Entities.CarReservationProcess>, ICarReservationProcessWriteRepository
    {
        public CarReservationProcessWriteRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
