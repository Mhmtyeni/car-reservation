﻿using AracTakip.Application.Abstractions.Services;
using MediatR;

namespace AracTakip.Application.Features.Queries.Role.GetRoleById
{
    public class GetRoleByIdQueryHandler : IRequestHandler<GetRoleByIdQueryRequest, GetRoleByIdQueryResponse>
    {
        readonly IRoleService _roleService;

        public GetRoleByIdQueryHandler(IRoleService roleService)
        {
            _roleService = roleService;
        }

        public async Task<GetRoleByIdQueryResponse> Handle(GetRoleByIdQueryRequest request, CancellationToken cancellationToken)
        {
            var data = await _roleService.GetRoleById(request.RoleId);
            return new()
            {
                Id = data.id,
                Name = data.name
            };
        }
    }
}
