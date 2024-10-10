using MediatR;

namespace AracTakip.Application.Features.Queries.Company.GetByIdCompany
{
    public class GetByIdCompanyQueryRequest : IRequest<GetByIdCompanyQueryResponse>
    {
        public string CompanyId { get; set; }
    }
}