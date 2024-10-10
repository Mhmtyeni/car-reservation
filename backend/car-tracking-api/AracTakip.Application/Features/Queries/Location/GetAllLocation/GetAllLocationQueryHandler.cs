using AracTakip.Application.Repositories.Location;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Queries.Location.GetAllLocation
{
    public class GetAllLocationQueryHandler : IRequestHandler<GetAllLocationQueryRequest, GetAllLocationQueryResponse>
    {
        readonly ILocationReadRepository _locationReadRepository;
        readonly ILogger<GetAllLocationQueryHandler> _logger;

        public GetAllLocationQueryHandler(ILocationReadRepository locationReadRepository, ILogger<GetAllLocationQueryHandler> logger)
        {
            _locationReadRepository = locationReadRepository;
            _logger = logger;
        }

        public async Task<GetAllLocationQueryResponse> Handle(GetAllLocationQueryRequest request, CancellationToken cancellationToken)
        {
            var totalLocationCount = _locationReadRepository.GetAll(false)
                .Where(x => x.IsActive == request.IsActive && x.IsDeleted == request.IsDeleted)
                .Count();
            var locations = _locationReadRepository.GetAll(false)
                .Where(x => x.IsActive == request.IsActive && x.IsDeleted == request.IsDeleted)
                .Skip(request.Page * request.Size)
                .Take(request.Size);
            _logger.LogInformation("tüm lokasyonlar");
            return new()
            {
                TotalLocationCount = totalLocationCount,
                Locations = locations
            };
        }
    }
}
