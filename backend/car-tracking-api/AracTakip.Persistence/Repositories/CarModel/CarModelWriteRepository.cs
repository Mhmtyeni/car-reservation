using AracTakip.Application.Repositories.CarModel;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.CarModel
{
    public class CarModelWriteRepository : WriteRepository<Domain.Entities.CarModel>, ICarModelWriteRepository
    {
        public CarModelWriteRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
