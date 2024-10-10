using MediatR;

namespace AracTakip.Application.Features.Commands.Location.CreateLocation
{
    public class CreateLocationCommandRequest : IRequest<CreateLocationCommandResponse>
    {
        public string LocationName { get; set; }
    }
}
