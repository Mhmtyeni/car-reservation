using AracTakip.Application.Consts;
using AracTakip.Application.CustomAttributes;
using AracTakip.Application.Enums;
using AracTakip.Application.Features.Commands.AppUser.AssignRoleToUser;
using AracTakip.Application.Features.Commands.AppUser.CreateUser;
using AracTakip.Application.Features.Commands.UserImageFile.RemoveUserImage;
using AracTakip.Application.Features.Commands.UserImageFile.UploadUserImage;
using AracTakip.Application.Features.Queries.AppUser.CheckUserNameExists;
using AracTakip.Application.Features.Queries.AppUser.GetAllUsers;
using AracTakip.Application.Features.Queries.AppUser.GetByIdUser;
using AracTakip.Application.Features.Queries.AppUser.GetByUserName;
using AracTakip.Application.Features.Queries.AppUser.GetRolesToUser;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AracTakip.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        readonly IMediator _mediator;

        public UsersController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost("create-user")]
        public async Task<IActionResult> CreateUser(CreateUserCommandRequest createUserCommandRequest)
        {
            CreateUserCommandResponse response = await _mediator.Send(createUserCommandRequest);
            return Ok(response);
        }

        [HttpGet("get-all-users")]
        [AuthorizeDefinition(ActionType = ActionType.Reading, Definition = "Tüm kullanıcılar", Menu = "Users")]
        public async Task<IActionResult> GetAllUsers([FromQuery] GetAllUsersQueryRequest getAllUsersQueryRequest)
        {
            GetAllUsersQueryResponse response = await _mediator.Send(getAllUsersQueryRequest);
            return Ok(response);
        }

        [HttpGet("get-roles-to-user/{UserId}")]
        [AuthorizeDefinition(ActionType = ActionType.Reading, Definition = "Kullanıcın sahip olduğu roller", Menu = "Users")]
        public async Task<IActionResult> GetRolesToUser([FromRoute] GetRolesToUserQueryRequest getRolesToUserQueryRequest)
        {
            GetRolesToUserQueryResponse response = await _mediator.Send(getRolesToUserQueryRequest);
            return Ok(response);
        }

        [HttpGet("get-by-id-user/{UserId}")]
        [AuthorizeDefinition(ActionType = ActionType.Reading, Definition = "İlgili kullanıcı bilgileri Id", Menu = "Users")]
        public async Task<IActionResult> GetByIdUser([FromRoute] GetByIdUserQueryRequest getByIdUserQueryRequest)
        {
            GetByIdUserQueryResponse response = await _mediator.Send(getByIdUserQueryRequest);
            return Ok(response);
        }
        [HttpGet("get-by-user-name/{UserName}")]
        [AuthorizeDefinition(ActionType = ActionType.Reading, Definition = "İlgili kullanıcı bilgileri Name", Menu = "Users")]
        public async Task<IActionResult> GetByUserName([FromRoute] GetByUserNameQueryRequest getByUserNameQueryRequest)
        {
            GetByUserNameQueryResponse response = await _mediator.Send(getByUserNameQueryRequest);
            return Ok(response);
        }
        [HttpGet("check-user-name-exists/{UserName}")]
        [AuthorizeDefinition(ActionType = ActionType.Reading, Definition = "İlgili kullanıcı var mı yok mu", Menu = "Users")]
        public async Task<IActionResult> CheckUserNameExists([FromRoute] CheckUserNameExistsQueryRequest checkUserNameExistsQueryRequest)
        {
            CheckUserNameExistsQueryResponse response = await _mediator.Send(checkUserNameExistsQueryRequest);
            return Ok(response);
        }
        [HttpPost("assign-role-to-user")]
        [AuthorizeDefinition(ActionType = ActionType.Reading, Definition = "Kullanıcıya Rol Ata", Menu = "Users")]
        public async Task<IActionResult> AssignRoleToUser(AssignRoleToUserCommandRequest assignRoleToUserCommandRequest)
        {
            AssignRoleToUserCommandResponse response = await _mediator.Send(assignRoleToUserCommandRequest);
            return Ok(response);
        }

        [HttpPost("upload-file-user")]
        [AuthorizeDefinition(ActionType = ActionType.Reading, Definition = "Kullanıcıya Ait Dosyaların(Image) Yüklenmesi", Menu = "Users")]
        public async Task<IActionResult> Upload([FromQuery] UploadUserImageCommandRequest uploadUserImageCommandRequest)
        {
            uploadUserImageCommandRequest.Files = Request.Form.Files;
            UploadUserImageCommandResponse response = await _mediator.Send(uploadUserImageCommandRequest);
            return Ok();
        }

        [HttpDelete("delete-file-user/{ImageId}")]
        [AuthorizeDefinition(ActionType = ActionType.Deleting, Definition = "Kullanıcıya Ait Dosyanın(Image) Silinmesi", Menu = "Users")]
        public async Task<IActionResult> DeleteUserImage([FromRoute] RemoveUserImageCommandRequest removeUserImageCommandRequest)
        {           
            RemoveUserImageCommandResponse response = await _mediator.Send(removeUserImageCommandRequest);
            return Ok();
        }


    }
}
