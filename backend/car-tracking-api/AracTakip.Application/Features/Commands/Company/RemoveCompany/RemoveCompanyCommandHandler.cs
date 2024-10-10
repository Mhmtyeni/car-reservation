using AracTakip.Application.Features.Commands.Company.UpdateCompany;
using AracTakip.Application.Repositories.Company;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Commands.Company.RemoveCompany
{
    public class RemoveCompanyCommandHandler : IRequestHandler<RemoveCompanyCommandRequest, RemoveCompanyCommandResponse>
    {
        readonly ICompanyReadRepository _companyReadRepository;
        readonly ICompanyWriteRepository _companyWriteRepository;

        public RemoveCompanyCommandHandler(ICompanyWriteRepository companyWriteRepository, ICompanyReadRepository companyReadRepository)
        {
            _companyWriteRepository = companyWriteRepository;
            _companyReadRepository = companyReadRepository;
        }

        public async Task<RemoveCompanyCommandResponse> Handle(RemoveCompanyCommandRequest request, CancellationToken cancellationToken)
        {
            Domain.Entities.Company company = await _companyReadRepository.GetByIdAsync(request.ComapnyId);
            company.ModifiedDate = DateTime.UtcNow;
            company.IsDeleted = true;
            company.IsActive = false;
            await _companyWriteRepository.SaveAsync();
            return new();
        }
    }
}
