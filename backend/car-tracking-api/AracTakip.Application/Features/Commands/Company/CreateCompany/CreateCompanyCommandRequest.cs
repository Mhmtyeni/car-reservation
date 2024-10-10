using MediatR;

namespace AracTakip.Application.Features.Commands.Company.CreateCompany
{
    public class CreateCompanyCommandRequest : IRequest<CreateCompanyCommandResponse>
    {
        public string CompanyName { get; set; }
    }
}