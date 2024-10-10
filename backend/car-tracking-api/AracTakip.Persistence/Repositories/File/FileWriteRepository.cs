using AracTakip.Application.Repositories.File;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.File
{
    public class FileWriteRepository : WriteRepository<Domain.Entities.File>, IFileWriteRepository
    {
        public FileWriteRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
