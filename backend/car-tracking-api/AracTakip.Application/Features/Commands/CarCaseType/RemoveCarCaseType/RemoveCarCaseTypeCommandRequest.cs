using MediatR;

namespace AracTakip.Application.Features.Commands.CarCaseType.RemoveCarCaseType
{
    public class RemoveCarCaseTypeCommandRequest : IRequest<RemoveCarCaseTypeCommandResponse>
    {
        public string CarCaseTypeId { get; set; }
    }
}
