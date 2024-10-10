using MediatR;

namespace AracTakip.Application.Features.Commands.Role.UpdateRole
{
    public class UpdateRoleCommandRequest : IRequest<UpdateRoleCommandResponse>
    {
        public string RoleId { get; set; }
        public string RoleName { get; set; }
    }
}