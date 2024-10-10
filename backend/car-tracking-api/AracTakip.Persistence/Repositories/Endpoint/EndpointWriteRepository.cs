using AracTakip.Application.Repositories;
using AracTakip.Domain.Entities;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories
{
    public class EndpointWriteRepository : WriteRepository<Endpoint>, IEndpointWriteRepository
    {
        public EndpointWriteRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
