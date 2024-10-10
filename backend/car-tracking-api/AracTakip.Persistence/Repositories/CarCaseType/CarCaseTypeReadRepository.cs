using AracTakip.Application.Repositories.CarCaseType;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.CarCaseType
{
    public class CarCaseTypeReadRepository : ReadRepository<Domain.Entities.CarCaseType>, ICarCaseTypeReadRepository
    {
        public CarCaseTypeReadRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
