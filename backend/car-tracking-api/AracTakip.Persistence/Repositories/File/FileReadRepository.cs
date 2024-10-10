using AracTakip.Application.Repositories.File;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.File
{
    public class FileReadRepository : ReadRepository<Domain.Entities.File>, IFileReadRepository
    {
        public FileReadRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
