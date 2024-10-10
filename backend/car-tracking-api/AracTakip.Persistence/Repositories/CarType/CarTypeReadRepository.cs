using AracTakip.Application.Repositories.CarType;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.CarType
{
    public class CarTypeReadRepository : ReadRepository<Domain.Entities.CarType>, ICarTypeReadRepository
    {
        public CarTypeReadRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
