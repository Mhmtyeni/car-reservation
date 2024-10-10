using AracTakip.Application.Repositories.CarBrand;
using AracTakip.Application.Repositories.CarEngineType;
using MediatR;

namespace AracTakip.Application.Features.Queries.CarEngineType.GetByIdCarEngineType
{
    public class GetByIdCarEngineTypeQueryHandler : IRequestHandler<GetByIdCarEngineTypeQueryRequest, GetByIdCarEngineTypeQueryResponse>
    {
        readonly ICarEngineTypeReadRepository _carEngineTypeReadRepository;

        public GetByIdCarEngineTypeQueryHandler(ICarEngineTypeReadRepository carEngineTypeReadRepository)
        {
            _carEngineTypeReadRepository = carEngineTypeReadRepository;
        }

        public async Task<GetByIdCarEngineTypeQueryResponse> Handle(GetByIdCarEngineTypeQueryRequest request, CancellationToken cancellationToken)
        {
            Domain.Entities.CarEngineType carEngineType = await _carEngineTypeReadRepository.GetByIdAsync(request.CarEngineTypeId, false);
            return new()
            {
                CarEngineTypeName = carEngineType.CarEngineTypeName,
                CreatedDate = carEngineType.CreatedDate,
                ModifiedDate = carEngineType.ModifiedDate,
                IsActive = carEngineType.IsActive,
                IsDeleted = carEngineType.IsDeleted
            };
        }
    }
}
