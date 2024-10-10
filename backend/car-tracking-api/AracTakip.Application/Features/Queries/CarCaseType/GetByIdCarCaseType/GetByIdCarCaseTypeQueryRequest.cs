using MediatR;

namespace AracTakip.Application.Features.Queries.CarCaseType.GetByIdCarCaseType
{
    public class GetByIdCarCaseTypeQueryRequest : IRequest<GetByIdCarCaseTypeQueryResponse>
    {
        public string CarCaseTypeId { get; set; }
    }
}
