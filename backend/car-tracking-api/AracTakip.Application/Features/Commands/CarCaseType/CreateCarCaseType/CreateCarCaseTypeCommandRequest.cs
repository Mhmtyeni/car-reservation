using MediatR;

namespace AracTakip.Application.Features.Commands.CarCaseType.CreateCarCaseType
{
    public class CreateCarCaseTypeCommandRequest : IRequest<CreateCarCaseTypeCommandResponse>
    {
        public string CarCaseTypeName { get; set; }
    }
}
