using MediatR;

namespace AracTakip.Application.Features.Commands.Location.RemoveLocation
{
    public class RemoveLocationCommandRequest:IRequest<RemoveLocationCommandResponse>
    {
        public string LocationId { get; set; }
    }
}
