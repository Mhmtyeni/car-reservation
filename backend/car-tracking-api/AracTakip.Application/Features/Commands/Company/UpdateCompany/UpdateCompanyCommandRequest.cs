using MediatR;

namespace AracTakip.Application.Features.Commands.Company.UpdateCompany
{
    public class UpdateCompanyCommandRequest : IRequest<UpdateCompanyCommandResponse>
    {
        public string CompanyId { get; set; }
        public string CompanyName { get; set; }
    }
}
