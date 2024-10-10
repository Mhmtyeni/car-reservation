using MediatR;
using Microsoft.AspNetCore.Http;

namespace AracTakip.Application.Features.Commands.UserImageFile.UploadUserImage
{
    public class UploadUserImageCommandRequest:IRequest<UploadUserImageCommandResponse>
    {
        public string UserId { get; set; }
        public string FileDescription { get; set; }
        public IFormFileCollection? Files { get; set; }
    }
}
