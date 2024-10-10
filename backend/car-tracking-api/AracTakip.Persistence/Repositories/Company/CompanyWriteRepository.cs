using AracTakip.Application.Repositories.Company;
using AracTakip.Persistence.Contexts;

namespace AracTakip.Persistence.Repositories.Company
{
    public class CompanyWriteRepository : WriteRepository<Domain.Entities.Company>, ICompanyWriteRepository
    {
        public CompanyWriteRepository(AracTakipAPIDBContext context) : base(context)
        {
        }
    }
}
