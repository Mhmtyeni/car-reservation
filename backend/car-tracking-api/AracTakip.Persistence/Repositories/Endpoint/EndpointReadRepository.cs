using AracTakip.Application.Repositories;
using AracTakip.Domain.Entities;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories
{
    public class EndpointReadRepository : ReadRepository<Endpoint>, IEndpointReadRepository
    {
        public EndpointReadRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
