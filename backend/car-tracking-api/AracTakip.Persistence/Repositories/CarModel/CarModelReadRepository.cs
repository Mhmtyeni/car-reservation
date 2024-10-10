using AracTakip.Application.Repositories.CarModel;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.CarModel
{
    public class CarModelReadRepository : ReadRepository<Domain.Entities.CarModel>, ICarModelReadRepository
    {
        public CarModelReadRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
