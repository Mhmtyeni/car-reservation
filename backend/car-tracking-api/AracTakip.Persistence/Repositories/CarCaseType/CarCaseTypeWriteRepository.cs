using AracTakip.Application.Repositories.CarCaseType;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.CarCaseType
{
    public class CarCaseTypeWriteRepository : WriteRepository<Domain.Entities.CarCaseType>, ICarCaseTypeWriteRepository
    {
        public CarCaseTypeWriteRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
