using MediatR;

namespace AracTakip.Application.Features.Commands.Car.ChangePassive
{
    public class ChangePassiveCommandRequest : IRequest<ChangePassiveCommandResponse>
    {
        public string CarId { get; set; }
        public bool IsPassive { get; set; }
    }
}
