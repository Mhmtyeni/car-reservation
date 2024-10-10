using MediatR;

namespace AracTakip.Application.Features.Commands.CarModel.RemoveCarModel
{
    public class RemoveCarModelCommandRequest : IRequest<RemoveCarModelCommandResponse>
    {
        public string CarModelId { get; set; }
    }
}
