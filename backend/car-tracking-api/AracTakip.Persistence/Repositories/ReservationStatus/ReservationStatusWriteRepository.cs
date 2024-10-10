using AracTakip.Application.Repositories.ReservationStatus;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.ReservationStatus
{
    public class ReservationStatusWriteRepository : WriteRepository<Domain.Entities.ReservationStatus>, IReservationStatusWriteRepository
    {
        public ReservationStatusWriteRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
