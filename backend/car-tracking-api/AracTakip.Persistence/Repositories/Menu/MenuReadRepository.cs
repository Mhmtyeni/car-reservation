using AracTakip.Application.Repositories;
using AracTakip.Domain.Entities;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories
{
    public class MenuReadRepository : ReadRepository<Menu>, IMenuReadRepository
    {
        public MenuReadRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
