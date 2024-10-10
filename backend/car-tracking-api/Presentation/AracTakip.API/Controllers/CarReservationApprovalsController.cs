using AracTakip.Application.Consts;
using AracTakip.Application.CustomAttributes;
using AracTakip.Application.Enums;
using AracTakip.Application.Features.Commands.CarReservationApproval.UpdateCarReservationApproval;
using AracTakip.Application.Features.Queries.CarReservationApproval.GetAllCarReservationApproval;
using AracTakip.Application.Features.Queries.CarReservationApproval.GetAllPassiveCarReservationApproval;
using AracTakip.Application.Features.Queries.CarReservationApproval.GetByUserIdCarReservationApproval;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AracTakip.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarReservationApprovalsController : ControllerBase
    {
        readonly IMediator _mediator;
        readonly ILogger<CarReservationApprovalsController> _logger;

        public CarReservationApprovalsController(IMediator mediator, ILogger<CarReservationApprovalsController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }
        [HttpGet("get-all-car-reservation-approval")]
        public async Task<IActionResult> Get([FromQuery] GetAllCarReservationApprovalQueryRequest getAllCarReservationApprovalQueryRequest)
        {
            GetAllCarReservationApprovalQueryResponse response = await _mediator.Send(getAllCarReservationApprovalQueryRequest);
            return Ok(response);
        }
        [HttpGet("get-by-user-id-car-reservation-approval")]
        public async Task<IActionResult> Get([FromQuery] GetByUserIdCarReservationApprovalQueryRequest getByUserIdCarReservationApprovalQueryRequest)
        {
            GetByUserIdCarReservationApprovalQueryResponse response = await _mediator.Send(getByUserIdCarReservationApprovalQueryRequest);
            return Ok(response);
        }
        [HttpGet("get-all-passive-car-reservation-approval")]
        public async Task<IActionResult> Get([FromQuery] GetAllPassiveCarReservationApprovalQueryRequest getAllPassiveCarReservationApprovalQueryRequest)
        {
            GetAllPassiveCarReservationApprovalQueryResponse response = await _mediator.Send(getAllPassiveCarReservationApprovalQueryRequest);
            return Ok(response);
        }
        [HttpPut("update-car-reservation-approval")]
        [Authorize(AuthenticationSchemes = "Admin")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.CarReservationApprovals, ActionType = ActionType.Updating, Definition = "Araba Rezervasyonunu Güncelle")]
        public async Task<IActionResult> Put([FromBody] UpdateCarReservationApprovalCommandRequest updateCarReservationApprovalCommandRequest)
        {
            UpdateCarReservationApprovalCommandResponse response = await _mediator.Send(updateCarReservationApprovalCommandRequest);
            return Ok();
        }
    }
}
