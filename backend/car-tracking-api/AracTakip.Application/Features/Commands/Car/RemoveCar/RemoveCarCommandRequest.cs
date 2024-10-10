using MediatR;

namespace AracTakip.Application.Features.Commands.Car.RemoveCar
{
    public class RemoveCarCommandRequest : IRequest<RemoveCarCommandResponse>
    {
        public string CarId { get; set; }
    }
}
