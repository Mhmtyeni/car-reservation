using AracTakip.Application.Repositories.Company;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.Company
{
    public class CompanyReadRepository : ReadRepository<Domain.Entities.Company>, ICompanyReadRepository
    {
        public CompanyReadRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
