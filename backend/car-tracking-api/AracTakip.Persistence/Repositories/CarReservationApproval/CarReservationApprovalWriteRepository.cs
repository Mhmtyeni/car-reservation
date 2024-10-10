using AracTakip.Application.Repositories.CarReservationApproval;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.CarReservationApproval
{
    public class CarReservationApprovalWriteRepository : WriteRepository<Domain.Entities.CarReservationApproval>, ICarReservationApprovalWriteRepository
    {
        public CarReservationApprovalWriteRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
