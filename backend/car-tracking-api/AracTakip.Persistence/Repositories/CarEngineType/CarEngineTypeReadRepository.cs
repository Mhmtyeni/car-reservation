using AracTakip.Application.Repositories.CarEngineType;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.CarEngineType
{
    public class CarEngineTypeReadRepository : ReadRepository<Domain.Entities.CarEngineType>, ICarEngineTypeReadRepository
    {
        public CarEngineTypeReadRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
