using AracTakip.Application.Repositories.Location;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Queries.Location.GetByIdLocation
{
    public class GetByIdLocationQueryHandler : IRequestHandler<GetByIdLocationQueryRequest, GetByIdLocationQueryResponse>
    {
        readonly ILocationReadRepository _locationReadRepository;
        readonly ILogger<GetByIdLocationQueryHandler> _logger;

        public GetByIdLocationQueryHandler(ILocationReadRepository locationReadRepository, ILogger<GetByIdLocationQueryHandler> logger)
        {
            _locationReadRepository = locationReadRepository;
            _logger = logger;
        }

        public async Task<GetByIdLocationQueryResponse> Handle(GetByIdLocationQueryRequest request, CancellationToken cancellationToken)
        {
            Domain.Entities.Location location = await _locationReadRepository.GetByIdAsync(request.LocationId);
            _logger.LogInformation($"{location.LocationName} lokasyonunun bilgileri");
            return new()
            {
                LocationName = location.LocationName,
                CreatedDate = location.CreatedDate,
                ModifiedDate = location.ModifiedDate,
                IsActive = location.IsActive,
                IsDeleted = location.IsDeleted,
            };
        }
    }
}
