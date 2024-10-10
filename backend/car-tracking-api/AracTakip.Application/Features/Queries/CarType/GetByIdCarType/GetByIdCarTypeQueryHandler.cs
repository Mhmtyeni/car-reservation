using AracTakip.Application.Repositories.CarType;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Queries.CarType.GetByIdCarType
{
    public class GetByIdCarTypeQueryHandler : IRequestHandler<GetByIdCarTypeQueryRequest, GetByIdCarTypeQueryResponse>
    {
        readonly ICarTypeReadRepository _carTypeReadRepository;
        readonly ILogger<GetByIdCarTypeQueryHandler> _logger;

        public GetByIdCarTypeQueryHandler(ICarTypeReadRepository carTypeReadRepository, ILogger<GetByIdCarTypeQueryHandler> logger)
        {
            _carTypeReadRepository = carTypeReadRepository;
            _logger = logger;
        }

        public async Task<GetByIdCarTypeQueryResponse> Handle(GetByIdCarTypeQueryRequest request, CancellationToken cancellationToken)
        {
            Domain.Entities.CarType carType = await _carTypeReadRepository.GetByIdAsync(request.CarTypeId);
            _logger.LogInformation($"{carType.CarTypeName} isimli araba tipi bilgileri....");
            return new()
            {
                CarTypeName = carType.CarTypeName,
                CreatedDate = carType.CreatedDate,
                ModifiedDate = carType.ModifiedDate,
                IsActive = carType.IsActive,
                IsDeleted = carType.IsDeleted,
            };
        }
    }
}
