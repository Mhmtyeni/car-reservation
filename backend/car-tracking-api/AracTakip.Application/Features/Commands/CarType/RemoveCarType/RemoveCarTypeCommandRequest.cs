using MediatR;

namespace AracTakip.Application.Features.Commands.CarType.RemoveCarType
{
    public class RemoveCarTypeCommandRequest : IRequest<RemoveCarTypeCommandResponse>
    {
        public string CarTypeId { get; set; }
    }
}
