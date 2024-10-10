using AracTakip.Application.Repositories;
using AracTakip.Domain.Entities;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories
{
    public class MenuWriteRepository : WriteRepository<Menu>, IMenuWriteRepository
    {
        public MenuWriteRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
