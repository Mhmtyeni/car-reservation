using MediatR;

namespace AracTakip.Application.Features.Commands.Location.UpdateLocation
{
    public class UpdateLocationCommandRequest : IRequest<UpdateLocationCommandResponse>
    {
        public string LocationId { get; set; }
        public string LocationName { get; set; }
    }
}
