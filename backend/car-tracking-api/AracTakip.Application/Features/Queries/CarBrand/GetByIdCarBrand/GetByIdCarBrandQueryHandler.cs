using AracTakip.Application.Repositories.CarBrand;
using MediatR;

namespace AracTakip.Application.Features.Queries.CarBrand.GetByIdCarBrand
{
    public class GetByIdCarBrandQueryHandler : IRequestHandler<GetByIdCarBrandQueryRequest, GetByIdCarBrandQueryResponse>
    {
        readonly ICarBrandReadRepository _carBrandReadRepository;

        public GetByIdCarBrandQueryHandler(ICarBrandReadRepository carBrandReadRepository)
        {
            _carBrandReadRepository = carBrandReadRepository;
        }

        public async Task<GetByIdCarBrandQueryResponse> Handle(GetByIdCarBrandQueryRequest request, CancellationToken cancellationToken)
        {
            Domain.Entities.CarBrand carBrand = await _carBrandReadRepository.GetByIdAsync(request.CarBrandId, false);
            return new()
            {
                CarBrandName = carBrand.CarBrandName,
                CreatedDate = carBrand.CreatedDate,
                ModifiedDate = carBrand.ModifiedDate,
                IsActive = carBrand.IsActive,
                IsDeleted = carBrand.IsDeleted
            };
        }
    }
}
