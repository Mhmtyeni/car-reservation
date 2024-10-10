using AracTakip.Application.Repositories.CarReservationApproval;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.CarReservationApproval
{
    public class CarReservationApprovalReadRepository : ReadRepository<Domain.Entities.CarReservationApproval>, ICarReservationApprovalReadRepository
    {
        public CarReservationApprovalReadRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
