using AracTakip.Application.CustomAttributes;
using AracTakip.Application.Enums;
using AracTakip.Application.Features.Commands.Role.CreateRole;
using AracTakip.Application.Features.Commands.Role.DeleteRole;
using AracTakip.Application.Features.Commands.Role.UpdateRole;
using AracTakip.Application.Features.Queries.Role.GetRoleById;
using AracTakip.Application.Features.Queries.Role.GetRoles;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AracTakip.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        readonly IMediator _mediator;

        public RolesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("get-all-roles")]
        [AuthorizeDefinition(ActionType = ActionType.Reading, Definition = "Tüm roller", Menu = "Roles")]
        public async Task<IActionResult> GetRoles([FromQuery] GetRolesQueryRequest getRolesQueryRequest)
        {
            GetRolesQueryResponse response = await _mediator.Send(getRolesQueryRequest);
            return Ok(response);
        }

        [HttpGet("get-by-id-role/{RoleId}")]
        [AuthorizeDefinition(ActionType = ActionType.Reading, Definition = "İlgili rol", Menu = "Roles")]
        public async Task<IActionResult> GetRoles([FromRoute] GetRoleByIdQueryRequest getRoleByIdQueryRequest)
        {
            GetRoleByIdQueryResponse response = await _mediator.Send(getRoleByIdQueryRequest);
            return Ok(response);
        }

        [HttpPost("add-role")]
        [AuthorizeDefinition(ActionType = ActionType.Writing, Definition = "Rol oluştur", Menu = "Roles")]
        public async Task<IActionResult> CreateRole([FromBody] CreateRoleCommandRequest createRoleCommandRequest)
        {
            CreateRoleCommandResponse response = await _mediator.Send(createRoleCommandRequest);
            return Ok(response);
        }

        [HttpPut("update-role")]
        [AuthorizeDefinition(ActionType = ActionType.Updating, Definition = "Rol güncelle", Menu = "Roles")]
        public async Task<IActionResult> UpdateRole([FromBody] UpdateRoleCommandRequest updateRoleCommandRequest)
        {
            UpdateRoleCommandResponse response = await _mediator.Send(updateRoleCommandRequest);
            return Ok(response);
        }

        [HttpDelete("delete-role{RoleId}")]
        [AuthorizeDefinition(ActionType = ActionType.Deleting, Definition = "Rol sil", Menu = "Roles")]
        public async Task<IActionResult> DeleteRole([FromRoute] DeleteRoleCommandRequest deleteRoleCommandRequest)
        {
            DeleteRoleCommandResponse response = await _mediator.Send(deleteRoleCommandRequest);
            return Ok(response);
        }
    }
}
