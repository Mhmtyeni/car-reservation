using AracTakip.Application.Repositories.CarBrand;
using AracTakip.Application.Repositories.CarModel;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Queries.CarModel.GetAllCarModel
{
    public class GetAllCarModelQueryHandler : IRequestHandler<GetAllCarModelQueryRequest, GetAllCarModelQueryResponse>
    {
        readonly ICarModelReadRepository _carModelReadRepository;
        readonly ILogger<GetAllCarModelQueryHandler> _logger;

        public GetAllCarModelQueryHandler(ILogger<GetAllCarModelQueryHandler> logger, ICarModelReadRepository carModelReadRepository)
        {
            _logger = logger;
            _carModelReadRepository = carModelReadRepository;
        }

        public async Task<GetAllCarModelQueryResponse> Handle(GetAllCarModelQueryRequest request, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Tüm araba markaları");
            var totalCarModelCount = _carModelReadRepository.GetAll(false)
               .Where(x => x.IsActive == request.IsActive && x.IsDeleted == request.IsDeleted)
               .Count();

            var carModels = _carModelReadRepository.GetAll(false)
                .Where(x => x.IsActive == request.IsActive && x.IsDeleted == request.IsDeleted)
                .Skip(request.Page * request.Size)
                .Take(request.Size)
                .Include(x => x.CarBrand)
                .Select(p => new
                {
                    p.Id,
                    p.CarBrand.CarBrandName,
                    p.CarModelName,
                    p.IsDeleted,
                    p.IsActive,
                    p.CreatedDate,
                    p.ModifiedDate,
                }).ToList();

            return new()
            {
                CarModels = carModels,
                TotalCarModelCount = totalCarModelCount
            };
        }
    }
}
