using MediatR;

namespace AracTakip.Application.Features.Commands.CarEngineType.RemoveCarEngineType
{
    public class RemoveCarEngineTypeCommandRequest : IRequest<RemoveCarEngineTypeCommandResponse>
    {
        public string CarEngineTypeId { get; set; }
    }
}
