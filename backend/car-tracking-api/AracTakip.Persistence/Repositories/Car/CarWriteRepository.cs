using AracTakip.Application.Repositories.Car;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.Car
{
    public class CarWriteRepository : WriteRepository<Domain.Entities.Car>, ICarWriteRepository
    {
        public CarWriteRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
