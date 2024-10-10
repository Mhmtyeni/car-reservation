using AracTakip.Application.Repositories.Location;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.Location
{
    public class LocationWriteRepository : WriteRepository<Domain.Entities.Location>, ILocationWriteRepository
    {
        public LocationWriteRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
