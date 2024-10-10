using AracTakip.Application.Repositories.CarBrand;
using AracTakip.Application.Repositories.CarCaseType;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Queries.CarCaseType.GetAllCarCaseType
{
    public class GetAllCarCaseTypeQueryHandler : IRequestHandler<GetAllCarCaseTypeQueryRequest, GetAllCarCaseTypeQueryResponse>
    {
        readonly ICarCaseTypeReadRepository _carCaseTypeReadRepository;
        readonly ILogger<GetAllCarCaseTypeQueryHandler> _logger;

        public GetAllCarCaseTypeQueryHandler(ICarCaseTypeReadRepository carCaseTypeReadRepository, ILogger<GetAllCarCaseTypeQueryHandler> logger)
        {
            _carCaseTypeReadRepository = carCaseTypeReadRepository;
            _logger = logger;
        }

        public async Task<GetAllCarCaseTypeQueryResponse> Handle(GetAllCarCaseTypeQueryRequest request, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Tüm araba kasaları");

            var totalCarCaseTypeCount = _carCaseTypeReadRepository.GetAll(false)
                .Where(x => x.IsActive == request.IsActive && x.IsDeleted == request.IsDeleted)
            .Count();

            var carCaseTypes = _carCaseTypeReadRepository.GetAll(false)
                .Where(x => x.IsActive == request.IsActive && x.IsDeleted == request.IsDeleted)
                .Skip(request.Page * request.Size)
                .Take(request.Size)
                .Select(p => new
                {
                    p.Id,
                    p.CarCaseTypeName,
                    p.IsDeleted,
                    p.IsActive,
                    p.CreatedDate,
                    p.ModifiedDate,
                }).ToList();
            return new()
            {
                CarCaseTypes = carCaseTypes,
                TotalCarCaseTypeCount = totalCarCaseTypeCount
            };
        }
    }
}
