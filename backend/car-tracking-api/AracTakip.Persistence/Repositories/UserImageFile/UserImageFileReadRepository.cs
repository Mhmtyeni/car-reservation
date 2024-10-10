using AracTakip.Application.Repositories.UserImageFile;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.UserImageFile
{
    public class UserImageFileReadRepository : ReadRepository<Domain.Entities.UserImageFile>, IUserImageFileReadRepository
    {
        public UserImageFileReadRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
