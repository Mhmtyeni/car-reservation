using AracTakip.Application.Repositories.CarEngineType;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.CarEngineType
{
    public class CarEngineTypeWriteRepository : WriteRepository<Domain.Entities.CarEngineType>, ICarEngineTypeWriteRepository
    {
        public CarEngineTypeWriteRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
