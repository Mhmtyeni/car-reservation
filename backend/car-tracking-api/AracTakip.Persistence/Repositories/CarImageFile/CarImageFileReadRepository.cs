using AracTakip.Application.Repositories.CarImageFile;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.CarImageFile
{
    public class CarImageFileReadRepository : ReadRepository<Domain.Entities.CarImageFile>, ICarImageFileReadRepository
    {
        public CarImageFileReadRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
