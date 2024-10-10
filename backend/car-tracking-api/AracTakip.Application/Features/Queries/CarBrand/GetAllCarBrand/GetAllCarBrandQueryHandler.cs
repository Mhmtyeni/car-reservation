using AracTakip.Application.Repositories.CarBrand;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Queries.CarBrand.GetAllCarBrand
{
    public class GetAllCarBrandQueryHandler : IRequestHandler<GetAllCarBrandQueryRequest, GetAllCarBrandQueryResponse>
    {
        readonly ICarBrandReadRepository _carBrandReadRepository;
        readonly ILogger<GetAllCarBrandQueryHandler> _logger;

        public GetAllCarBrandQueryHandler(ICarBrandReadRepository carBrandReadRepository, ILogger<GetAllCarBrandQueryHandler> logger)
        {
            _carBrandReadRepository = carBrandReadRepository;
            _logger = logger;
        }

        public async Task<GetAllCarBrandQueryResponse> Handle(GetAllCarBrandQueryRequest request, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Tüm araba markaları");

            var totalCarBrandCount = _carBrandReadRepository.GetAll(false)
                .Where(x => x.IsActive == request.IsActive && x.IsDeleted == request.IsDeleted)
                .Count();

            var carBrands = _carBrandReadRepository.GetAll(false)
                .Where(x => x.IsActive == request.IsActive && x.IsDeleted == request.IsDeleted)
                .Skip(request.Page * request.Size)
                .Take(request.Size)
                .Select(p => new
                {
                    p.Id,
                    p.CarBrandName,
                    p.IsDeleted,
                    p.IsActive,
                    p.CreatedDate,
                    p.ModifiedDate,
                }).ToList();

            return new()
            {
                CarBrands = carBrands,
                TotalCarBrandCount = totalCarBrandCount
            };
        }
    }
}
