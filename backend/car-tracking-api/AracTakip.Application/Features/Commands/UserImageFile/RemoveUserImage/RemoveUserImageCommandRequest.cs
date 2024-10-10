using MediatR;

namespace AracTakip.Application.Features.Commands.UserImageFile.RemoveUserImage
{
    public class RemoveUserImageCommandRequest : IRequest<RemoveUserImageCommandResponse>
    {
        public string? ImageId { get; set; }
    }
}
