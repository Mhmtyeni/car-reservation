using AracTakip.Application.Repositories.UserImageFile;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.UserImageFile
{
    public class UserImageFileWriteRepository : WriteRepository<Domain.Entities.UserImageFile>, IUserImageFileWriteRepository
    {
        public UserImageFileWriteRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
