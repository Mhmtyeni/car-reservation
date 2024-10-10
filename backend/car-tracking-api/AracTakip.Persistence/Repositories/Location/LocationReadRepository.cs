using AracTakip.Application.Repositories.Location;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.Location
{
    public class LocationReadRepository : ReadRepository<Domain.Entities.Location>, ILocationReadRepository
    {
        public LocationReadRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
