using MediatR;

namespace AracTakip.Application.Features.Commands.Company.RemoveCompany
{
    public class RemoveCompanyCommandRequest : IRequest<RemoveCompanyCommandResponse>
    {
        public string ComapnyId { get; set; }
    }
}
