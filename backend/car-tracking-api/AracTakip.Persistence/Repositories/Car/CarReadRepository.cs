using AracTakip.Application.Repositories.Car;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.Car
{
    public class CarReadRepository : ReadRepository<Domain.Entities.Car>, ICarReadRepository
    {
        public CarReadRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
