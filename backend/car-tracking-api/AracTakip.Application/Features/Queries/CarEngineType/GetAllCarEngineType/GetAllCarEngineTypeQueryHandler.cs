using AracTakip.Application.Repositories.CarEngineType;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Queries.CarEngineType.GetAllCarEngineType
{
    public class GetAllCarEngineTypeQueryHandler : IRequestHandler<GetAllCarEngineTypeQueryRequest, GetAllCarEngineTypeQueryResponse>
    {
        readonly ICarEngineTypeReadRepository _carEngineTypeReadRepository;
        readonly ILogger<GetAllCarEngineTypeQueryHandler> _logger;

        public GetAllCarEngineTypeQueryHandler(ICarEngineTypeReadRepository carEngineTypeReadRepository, ILogger<GetAllCarEngineTypeQueryHandler> logger)
        {
            _carEngineTypeReadRepository = carEngineTypeReadRepository;
            _logger = logger;
        }

        public async Task<GetAllCarEngineTypeQueryResponse> Handle(GetAllCarEngineTypeQueryRequest request, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Tüm araba motor tipleri");
            var totalCarEngineTypeCount = _carEngineTypeReadRepository.GetAll(false)
                .Where(x => x.IsActive == request.IsActive && x.IsDeleted == request.IsDeleted)
                .Count();
            var carEngineTypes = _carEngineTypeReadRepository.GetAll(false)
                .Where(x => x.IsActive == request.IsActive && x.IsDeleted == request.IsDeleted)
                .Skip(request.Page * request.Size)
                .Take(request.Size)
                .Select(x => new
                {
                    x.Id,
                    x.CarEngineTypeName,
                    x.CreatedDate,
                    x.ModifiedDate,
                    x.IsDeleted,
                    x.IsActive,
                });
            return new()
            {
                TotalCarEngineTypeCount = totalCarEngineTypeCount,
                CarEngineTypes = carEngineTypes
            };
        }
    }
}
