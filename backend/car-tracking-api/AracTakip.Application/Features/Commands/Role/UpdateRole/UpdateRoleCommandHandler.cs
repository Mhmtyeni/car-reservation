﻿using AracTakip.Application.Abstractions.Services;
using MediatR;

namespace AracTakip.Application.Features.Commands.Role.UpdateRole
{
    public class UpdateRoleCommandHandler : IRequestHandler<UpdateRoleCommandRequest, UpdateRoleCommandResponse>
    {
        readonly IRoleService _roleService;

        public UpdateRoleCommandHandler(IRoleService roleService)
        {
            _roleService = roleService;
        }

        public async Task<UpdateRoleCommandResponse> Handle(UpdateRoleCommandRequest request, CancellationToken cancellationToken)
        {
            var result = await _roleService.UpdateRole(request.RoleId, request.RoleName);
            return new()
            {
                Succeeded = result
            };
        }
    }
}
