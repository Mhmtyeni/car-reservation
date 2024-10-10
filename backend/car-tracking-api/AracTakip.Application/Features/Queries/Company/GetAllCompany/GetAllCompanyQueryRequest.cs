using MediatR;

namespace AracTakip.Application.Features.Queries.Company.GetAllCompany
{
    public class GetAllCompanyQueryRequest : BaseQueryRequest, IRequest<GetAllCompanyQueryResponse>
    {

    }
}