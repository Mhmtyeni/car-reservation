using AracTakip.Application.Repositories.CarReservationUserImageFile;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.CarReservationUserImageFile
{
    public class CarReservationUserImageFileReadRepository : ReadRepository<Domain.Entities.CarReservationUserImageFile>, ICarReservationUserImageFileReadRepository
    {
        public CarReservationUserImageFileReadRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
