using AracTakip.Application.Abstractions.Hubs;
using AracTakip.Application.Features.Commands.Company.CreateCompany;
using AracTakip.Application.Repositories.Company;
using MediatR;

namespace AracTakip.Application.Features.Commands.Product.CreateProduct
{
    public class CreateCompanyCommandHandler : IRequestHandler<CreateCompanyCommandRequest, CreateCompanyCommandResponse>
    {
        readonly ICompanyWriteRepository _companyWriteRepository;
        readonly ICompanyHubService _companyHubService;

        public CreateCompanyCommandHandler(ICompanyWriteRepository productWriteRepository, ICompanyHubService productHubService)
        {
            _companyWriteRepository = productWriteRepository;
            _companyHubService = productHubService;
        }

        public async Task<CreateCompanyCommandResponse> Handle(CreateCompanyCommandRequest request, CancellationToken cancellationToken)
        {
            await _companyWriteRepository.AddAsync(new()
            {
                CompanyName = request.CompanyName,
                IsActive = true,
            });
            await _companyWriteRepository.SaveAsync();
            await _companyHubService.CompanyAddedMessageAsync($"{request.CompanyName} isminde şirket eklenmiştir.");
            return new();
        }
    }
}