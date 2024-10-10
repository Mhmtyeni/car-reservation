using AracTakip.Application.Repositories.CarBrand;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.CarBrand
{
    public class CarBrandReadRepository : ReadRepository<Domain.Entities.CarBrand>, ICarBrandReadRepository
    {
        public CarBrandReadRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
