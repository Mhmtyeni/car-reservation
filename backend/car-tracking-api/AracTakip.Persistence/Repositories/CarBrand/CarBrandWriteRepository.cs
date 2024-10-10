using AracTakip.Application.Repositories.CarBrand;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.CarBrand
{
    public class CarBrandWriteRepository : WriteRepository<Domain.Entities.CarBrand>, ICarBrandWriteRepository
    {
        public CarBrandWriteRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
