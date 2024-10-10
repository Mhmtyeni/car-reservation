using AracTakip.Application.Repositories.Company;
using MediatR;

namespace AracTakip.Application.Features.Queries.Company.GetByIdCompany
{
    public class GetByIdCompanyQueryHandler : IRequestHandler<GetByIdCompanyQueryRequest, GetByIdCompanyQueryResponse>
    {
        readonly ICompanyReadRepository _companyReadRepository;
        public GetByIdCompanyQueryHandler(ICompanyReadRepository companyReadRepository)
        {
            _companyReadRepository = companyReadRepository;
        }
        public async Task<GetByIdCompanyQueryResponse> Handle(GetByIdCompanyQueryRequest request, CancellationToken cancellationToken)
        {
            Domain.Entities.Company company = await _companyReadRepository.GetByIdAsync(request.CompanyId, false);
            return new()
            {
                CompanyName = company.CompanyName,
                CreatedDate = company.CreatedDate,
                ModifiedDate = company.ModifiedDate,
                IsActive = company.IsActive,
                IsDeleted = company.IsDeleted,
            };

        }
    }
}