using AracTakip.Application.Repositories.CarModel;
using AracTakip.Application.Repositories.CarType;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Queries.CarType.GetAllCarType
{
    public class GetAllCarTypeQueryHandler : IRequestHandler<GetAllCarTypeQueryRequest, GetAllCarTypeQueryResponse>
    {
        readonly ICarTypeReadRepository _carTypeReadRepository;
        readonly ILogger<GetAllCarTypeQueryHandler> _logger;

        public GetAllCarTypeQueryHandler(ICarTypeReadRepository carTypeReadRepository, ILogger<GetAllCarTypeQueryHandler> logger)
        {
            _carTypeReadRepository = carTypeReadRepository;
            _logger = logger;
        }

        public async Task<GetAllCarTypeQueryResponse> Handle(GetAllCarTypeQueryRequest request, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Tüm araba tipleri");
            var totalCarTypeCount = _carTypeReadRepository.GetAll(false)
               .Where(x => x.IsActive == request.IsActive && x.IsDeleted == request.IsDeleted)
            .Count();

            var carTypes = _carTypeReadRepository.GetAll(false)
                .Where(x => x.IsActive == request.IsActive && x.IsDeleted == request.IsDeleted)
                .Skip(request.Page * request.Size)
                .Take(request.Size)
                .Select(p => new
                {
                    p.Id,
                    p.CarTypeName,
                    p.IsDeleted,
                    p.IsActive,
                    p.CreatedDate,
                    p.ModifiedDate,
                }).ToList();

            return new()
            {

                TotalCarTypeCount = totalCarTypeCount,
                CarTypes = carTypes
            };
        }
    }
}
