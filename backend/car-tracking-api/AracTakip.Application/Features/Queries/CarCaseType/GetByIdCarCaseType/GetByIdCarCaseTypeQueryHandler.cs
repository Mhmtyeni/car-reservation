using AracTakip.Application.Repositories.CarBrand;
using AracTakip.Application.Repositories.CarCaseType;
using MediatR;

namespace AracTakip.Application.Features.Queries.CarCaseType.GetByIdCarCaseType
{


    public class GetByIdCarCaseTypeQueryHandler : IRequestHandler<GetByIdCarCaseTypeQueryRequest, GetByIdCarCaseTypeQueryResponse>
    {
        readonly ICarCaseTypeReadRepository _carCaseTypeReadRepository;

        public GetByIdCarCaseTypeQueryHandler(ICarCaseTypeReadRepository carCaseTypeReadRepository)
        {
            _carCaseTypeReadRepository = carCaseTypeReadRepository;
        }

        public async Task<GetByIdCarCaseTypeQueryResponse> Handle(GetByIdCarCaseTypeQueryRequest request, CancellationToken cancellationToken)
        {
            Domain.Entities.CarCaseType carCaseType = await _carCaseTypeReadRepository.GetByIdAsync(request.CarCaseTypeId, false);
            return new()
            {
                CarCaseTypeName = carCaseType.CarCaseTypeName,
                CreatedDate = carCaseType.CreatedDate,
                ModifiedDate = carCaseType.ModifiedDate,
                IsActive = carCaseType.IsActive,
                IsDeleted = carCaseType.IsDeleted
            };
        }
    }
}
