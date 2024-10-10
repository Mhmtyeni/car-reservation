using AracTakip.Application.Repositories.CarReservationUserImageFile;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.CarReservationUserImageFile
{
    public class CarReservationUserImageFileWriteRepository : WriteRepository<Domain.Entities.CarReservationUserImageFile>, ICarReservationUserImageFileWriteRepository
    {
        public CarReservationUserImageFileWriteRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
