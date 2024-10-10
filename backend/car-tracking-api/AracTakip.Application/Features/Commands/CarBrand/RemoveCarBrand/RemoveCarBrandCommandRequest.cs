using MediatR;

namespace AracTakip.Application.Features.Commands.CarBrand.RemoveCarBrand
{
    public class RemoveCarBrandCommandRequest : IRequest<RemoveCarBrandCommandResponse>
    {
        public string CarBrandId { get; set; }
    }
}
