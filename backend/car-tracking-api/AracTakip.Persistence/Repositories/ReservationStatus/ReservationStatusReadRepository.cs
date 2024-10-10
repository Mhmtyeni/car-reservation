using AracTakip.Application.Repositories.ReservationStatus;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.ReservationStatus
{
    public class ReservationStatusReadRepository : ReadRepository<Domain.Entities.ReservationStatus>, IReservationStatusReadRepository
    {
        public ReservationStatusReadRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
