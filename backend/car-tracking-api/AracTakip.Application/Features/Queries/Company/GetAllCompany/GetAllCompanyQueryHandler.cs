using AracTakip.Application.Repositories.Company;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Queries.Company.GetAllCompany
{
    public class GetAllCompanyQueryHandler : IRequestHandler<GetAllCompanyQueryRequest, GetAllCompanyQueryResponse>
    {
        readonly ICompanyReadRepository _companyReadRepository;
        readonly ILogger<GetAllCompanyQueryHandler> _logger;
        public GetAllCompanyQueryHandler(ICompanyReadRepository companyReadRepository, ILogger<GetAllCompanyQueryHandler> logger)
        {
            _companyReadRepository = companyReadRepository;
            _logger = logger;
        }
        public async Task<GetAllCompanyQueryResponse> Handle(GetAllCompanyQueryRequest request, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Tüm şirketler");

            var totalCompanyCount = _companyReadRepository.GetAll(false)
                .Where(x => x.IsActive == request.IsActive && x.IsDeleted == request.IsDeleted)
                .Count();

            var companies = _companyReadRepository.GetAll(false)
                .Where(x => x.IsActive == request.IsActive && x.IsDeleted == request.IsDeleted)
                .Skip(request.Page * request.Size)
                .Take(request.Size);
            return new()
            {
                Companies = companies,
                TotalCompanyCount = totalCompanyCount
            };

        }
    }
}