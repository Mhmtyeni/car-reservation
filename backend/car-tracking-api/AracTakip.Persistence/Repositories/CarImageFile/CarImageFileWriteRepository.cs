using AracTakip.Application.Repositories.CarImageFile;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.CarImageFile
{
    public class CarImageFileWriteRepository : WriteRepository<Domain.Entities.CarImageFile>, ICarImageFileWriteRepository
    {
        public CarImageFileWriteRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
