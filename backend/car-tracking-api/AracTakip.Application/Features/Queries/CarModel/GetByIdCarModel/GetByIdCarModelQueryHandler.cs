using AracTakip.Application.Repositories.CarBrand;
using AracTakip.Application.Repositories.CarModel;
using MediatR;

namespace AracTakip.Application.Features.Queries.CarModel.GetByIdCarModel
{
    public class GetByIdCarModelQueryHandler : IRequestHandler<GetByIdCarModelQueryRequest, GetByIdCarModelQueryResponse>
    {
        readonly ICarModelReadRepository _carModelReadRepository;
        readonly ICarBrandReadRepository _carBrandReadRepository;

        public GetByIdCarModelQueryHandler(ICarModelReadRepository carModelReadRepository, ICarBrandReadRepository carBrandReadRepository)
        {
            _carModelReadRepository = carModelReadRepository;
            _carBrandReadRepository = carBrandReadRepository;
        }

        public async Task<GetByIdCarModelQueryResponse> Handle(GetByIdCarModelQueryRequest request, CancellationToken cancellationToken)
        {
            Domain.Entities.CarModel carModel = await _carModelReadRepository.GetByIdAsync(request.CarModelId, false);
            Domain.Entities.CarBrand carBrand = await _carBrandReadRepository.GetByIdAsync(carModel.CarBrandId.ToString(), false);
            return new()
            {
                CarBrandName = carBrand.CarBrandName,
                CarModelName = carModel.CarModelName,
                CreatedDate = carModel.CreatedDate,
                ModifiedDate = carModel.ModifiedDate,
                IsActive = carModel.IsActive,
                IsDeleted = carModel.IsDeleted
            };
        }
    }
}
