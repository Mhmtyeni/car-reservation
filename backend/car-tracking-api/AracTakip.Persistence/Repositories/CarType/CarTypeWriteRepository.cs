using AracTakip.Application.Repositories.CarType;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.CarType
{
    public class CarTypeWriteRepository : WriteRepository<Domain.Entities.CarType>, ICarTypeWriteRepository
    {
        public CarTypeWriteRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
